const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');
const express = require("express");
const cors = require("cors");
const tmi = require("tmi.js");
const app = express();
const server = require('http').createServer(app);
const path = require('path');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const sheets = new Map();

const FULL_URL_SIZE = 7;
const URL_WITHOUT_HTTP_SIZE = 5;

app.post("/api/createArchive", async (req, res) => {
    const { link, streamerName } = req.body;
    let archive;
    const parts = link.split('/');
    if (parts.length == 1) {
        archive = parts[0];
    } else if (parts.length == FULL_URL_SIZE) {
        archive = parts[5];
    } else if (parts.length == URL_WITHOUT_HTTP_SIZE) {
        archive = parts[3];
    } else {
        res.status(400).send({ error: "Link not valid" });
        return
    }

    try {
        const doc = new GoogleSpreadsheet(archive);
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
        });

        await doc.loadInfo();
        const newSheet = await doc.addSheet({
            headerValues: ['Card', 'Rating', 'User'],
            title: "Chat"
        });
        sheets.set(streamerName, newSheet);

        res.status(200).send({ success: true });
    } catch (e) {
        try {
            const doc = new GoogleSpreadsheet(archive);
            await doc.useServiceAccountAuth({
                client_email: credentials.client_email,
                private_key: credentials.private_key.replace(/\\n/g, '\n')
            });

            await doc.loadInfo();
            const newSheet = await doc.addSheet({
                headerValues: ['Card', 'Rating', 'User'],
            });
            sheets.set(streamerName, newSheet);

            res.status(200).send({ success: true });
        } catch (e) {
            res.status(400).send({ error: "You need to give permission to edit the spreadsheet" });
        }
    }

});

let activeTMIs = new Map();
let currentCard = new Map();
let currentUsers = new Map();
let currentCheckpoint = new Map();
let currentSum = new Map();

const botNames = ["streamelements", "nightbot"];

app.post("/api/record", (req, res) => {
    const { streamerName, cardName } = req.body;
    if (activeTMIs.has(streamerName)) {
        currentCard.set(streamerName, cardName);
        currentSum.set(streamerName, 0);
        currentCheckpoint.set(streamerName, currentCheckpoint.get(streamerName) + currentUsers.get(streamerName).length + 1);
        currentUsers.set(streamerName, []);
    } else {
        currentCard.set(streamerName, cardName);
        currentSum.set(streamerName, 0);
        currentCheckpoint.set(streamerName, - 1);
        currentUsers.set(streamerName, []);

        const tmiClient = new tmi.Client({
            channels: [streamerName]
        });
        tmiClient.connect();
        tmiClient.on('message', async (channel, tags, message, self) => {
            if (!activeTMIs.get(streamerName)) return;
            const isBot = botNames.includes(tags.username.toLowerCase());
            if (isBot) return;

            let messageFirstChar = message.slice(0, 1);
            let messageRating = parseInt(messageFirstChar);
            if (isMessageRatingValid(messageRating)) {
                const haveRatedAlready = currentUsers.get(streamerName).includes(tags.username);
                if (!haveRatedAlready) {
                    let sheet = sheets.get(streamerName);
                    sheet.addRow({
                        Card: currentCard.get(streamerName),
                        Rating: messageRating,
                        User: tags.username
                    });
                    currentUsers.get(streamerName).push(tags.username);
                    currentSum.set(streamerName, currentSum.get(streamerName) + messageRating);
                } else {
                    let sheet = sheets.get(streamerName);
                    rows = await sheet.getRows();
                    rowToEdit = rows.find((row, index) =>
                        index > currentCheckpoint.get(streamerName) && row._rawData[2] == tags.username
                    );
                    currentSum.set(streamerName, currentSum.get(streamerName) + messageRating - rowToEdit.Rating);
                    rowToEdit.Rating = messageRating;
                    await rowToEdit.save();
                }
            }
        });
    }
    activeTMIs.set(streamerName, true);
    res.status(200).send({ message: "recording chat" });

});

app.post("/api/stop", (req, res) => {
    const { streamerName } = req.body;
    activeTMIs.set(streamerName, false);
    let avg = currentSum.get(streamerName) / currentUsers.get(streamerName).length;
    const sheet = sheets.get(streamerName);
    sheet.addRow({
        Card: currentCard.get(streamerName),
        Rating: avg,
        User: "CHAT AVERAGE"
    });

    res.status(200).send({ success: true });
});

const isMessageRatingValid = (messageRating) => {
    return messageRating && messageRating > 0 && messageRating < 5;
}



app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server running on port 5000!');
});
