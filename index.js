const { GoogleSpreadsheet } = require('google-spreadsheet');
const archive = require('./archive.json');
const credentials = require('./credentials.json');
const express = require("express");
const cors = require("cors");
const tmi = require("tmi.js");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    serveClient: true,
    cors: {
        methods: ["GET", "POST"],
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const getDoc = async () => {
    const doc = new GoogleSpreadsheet(archive.id);

    await doc.useServiceAccountAuth({
        client_email: credentials.client_email,
        private_key: credentials.private_key.replace(/\\n/g, '\n')
    });

    await doc.loadInfo();
    return doc.sheetsByIndex[0];
}

const sheet = getDoc();

let activeTMIs = new Map();
//let shouldRecord = false;
let currentCard = new Map();
let currentUsers = new Map();
let currentCheckpoint = new Map();
let currentSum = new Map();

const botNames = ["streamelements", "nightbot"];

io.on("connection", socket => {
    socket.on('record chat', (data) => {
        data = JSON.parse(data);
        shouldRecord = true;
        if (activeTMIs.has(data.roomName)) {
            currentCard.set(data.roomName, data.cardName);
            currentSum.set(data.roomName, 0);
            currentCheckpoint.set(data.roomName, currentCheckpoint.get(data.roomName) + currentUsers.get(data.roomName).length + 1);
            currentUsers.set(data.roomName, []);
        } else {
            currentCard.set(data.roomName, data.cardName);
            currentSum.set(data.roomName, 0);
            currentCheckpoint.set(data.roomName, - 1);
            currentUsers.set(data.roomName, []);

            const tmiClient = new tmi.Client({
                channels: [data.roomName]
            });
            tmiClient.connect();
            tmiClient.on('message', (channel, tags, message, self) => {
                if (!activeTMIs.get(data.roomName)) return;
                const isBot = botNames.includes(tags.username.toLowerCase());
                if (isBot) return;

                let messageFirstChar = message.slice(0, 1);
                let messageRating = parseInt(messageFirstChar);
                if (isMessageRatingValid(messageRating)) {
                    const haveRatedAlready = currentUsers.get(data.roomName).includes(tags.username);
                    if (!haveRatedAlready) {
                        sheet.then(s => {
                            s.addRow({
                                Card: currentCard.get(data.roomName),
                                Rating: messageRating,
                                User: tags.username
                            });
                        });
                        currentUsers.get(data.roomName).push(tags.username);
                        currentSum.set(data.roomName, currentSum.get(data.roomName) + messageRating);
                    } else {
                        sheet.then(async (s) => {
                            rows = await s.getRows();
                            rowToEdit = rows.find((row, index) =>
                                index > currentCheckpoint.get(data.roomName) && row._rawData[2] == tags.username
                            );
                            currentSum.set(data.roomName, currentSum.get(data.roomName) + messageRating - rowToEdit.Rating);
                            rowToEdit.Rating = messageRating;
                            await rowToEdit.save();
                        });
                    }
                }
            });
        }
        activeTMIs.set(data.roomName, true);
    });

    socket.on('stop recording', (data) => {
        //shouldRecord = false;
        data = JSON.parse(data);
        activeTMIs.set(data.roomName, false);
        sheet.then(s => {
            avg = currentSum.get(data.roomName) / currentUsers.get(data.roomName).length;
            s.addRow({
                Card: currentCard.get(data.roomName),
                Rating: avg,
                User: "CHAT AVERAGE"
            });
        });
    });
});

const isMessageRatingValid = (messageRating) => {
    return messageRating && messageRating > 0 && messageRating < 5;
}




server.listen(5000, () => {
    console.log('Server running on port 5000!');
});
