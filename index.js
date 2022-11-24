const { GoogleSpreadsheet } = require('google-spreadsheet');
const express = require("express");
const cors = require("cors");
const tmi = require("tmi.js");
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const Stat = require('./models/stat');
const User = require('./models/user');
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const FULL_URL_SIZE = 7;
const URL_WITHOUT_HTTP_SIZE = 5;

const getDoc = async (link) => {
    let archive;
    const parts = link.split('/');
    if (parts.length == 1) {
        archive = parts[0];
    } else if (parts.length == FULL_URL_SIZE) {
        archive = parts[5];
    } else if (parts.length == URL_WITHOUT_HTTP_SIZE) {
        archive = parts[3];
    } else {
        throw { error: "Link not valid" };
    }

    try {
        const doc = new GoogleSpreadsheet(archive);
        await doc.useServiceAccountAuth({
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
        });

        await doc.loadInfo();
        return doc;
    } catch (e) {
        throw e;
    }
};


app.post("/api/createArchive", async (req, res) => {
    const { link, streamerName } = req.body;
    await User.findOneAndReplace({ name: streamerName }, { name: streamerName, sheetLink: link }, {
        new: true,
        upsert: true
    });
    try {
        const doc = await getDoc(link);
        const newSheet = await doc.addSheet({
            headerValues: ['Card', 'Rating', 'User'],
            title: "Chat"
        });
        await Stat.findOneAndUpdate({ name: "archives" }, { $inc: { value: 1 } });
        res.status(200).send({ success: true });
    } catch (e) {
        res.status(400).send({ error: "You need to give permission to edit the spreadsheet and the spreadsheet must not have a Chat sheet" });
    }

});

let activeTMIs = new Map();
let currentCard = new Map();
let currentUsers = new Map();
let currentCheckpoint = new Map();
let currentSum = new Map();
const batches = new Map();

const botNames = ["streamelements", "nightbot"];

app.post("/api/record", async (req, res) => {
    const { streamerName, cardName } = req.body;
    if (activeTMIs.has(streamerName)) {
        currentCard.set(streamerName, cardName);
        currentSum.set(streamerName, 0);
        currentCheckpoint.set(streamerName, currentCheckpoint.get(streamerName) + currentUsers.get(streamerName).length + 1);
        currentUsers.set(streamerName, []);
        batches.set(streamerName, []);
    } else {
        currentCard.set(streamerName, cardName);
        currentSum.set(streamerName, 0);
        const user = await User.findOne({ name: streamerName });
        if (!user) {
            return res.status(400).send({ error: "No sheet was found for that twitch channel" });
        }
        const link = user.sheetLink;
        try {
            const doc = await getDoc(link);
            const sheet = doc.sheetsByTitle["Chat"];
            const rows = await sheet.getRows();
            currentCheckpoint.set(streamerName, rows.length - 1);
        } catch (e) {
            console.log(e);
            return res.status(400).send({ error: "There was an error connecting to the sheet" });
        }
        currentUsers.set(streamerName, []);
        batches.set(streamerName, []);

        const tmiClient = new tmi.Client({
            channels: [streamerName]
        });
        tmiClient.connect();
        tmiClient.on('message', async (channel, tags, message, self) => {
            if (!activeTMIs.get(streamerName)) return;
            await Stat.findOneAndUpdate({ name: "messagesRead" }, { $inc: { value: 1 } });

            const isBot = botNames.includes(tags.username.toLowerCase());
            if (isBot) return;

            let messageFirstChar = message.slice(0, 1);
            let messageRating = parseInt(messageFirstChar);
            messageRating = Math.floor(Math.random() * 5);
            if (isMessageRatingValid(messageRating)) {
                const haveRatedAlready = currentUsers.get(streamerName).includes(tags.username);
                if (!haveRatedAlready) {
                    batches.get(streamerName).push({
                        Card: currentCard.get(streamerName),
                        Rating: messageRating,
                        User: tags.username
                    });
                    currentUsers.get(streamerName).push(tags.username);
                    currentSum.set(streamerName, currentSum.get(streamerName) + messageRating);
                    await Stat.findOneAndUpdate({ name: "ratings" }, { $inc: { value: 1 } });
                } else {
                    let batch = batches.get(streamerName);
                    batch.forEach((row) => {
                        if (row.User === tags.username) {
                            currentSum.set(streamerName, currentSum.get(streamerName) + messageRating - row.Rating);
                            row.Rating = messageRating;
                        }
                    });
                    batches.set(streamerName, batch);
                    // let index = batch.findIndex((row) => row.User == tags.username);
                    // if (index >= 0) {
                    //     currentSum.set(streamerName, currentSum.get(streamerName) + messageRating - batch[index].Rating);
                    //     batch[index] = { ...batch[index], Rating: messageRating };
                    //     batches.set(streamerName, batch);
                    // }

                }

            }

        });
    }
    activeTMIs.set(streamerName, true);
    res.status(200).send({ message: "recording chat" });

});

app.post("/api/stop", async (req, res) => {
    const { streamerName } = req.body;
    activeTMIs.set(streamerName, false);
    const user = await User.findOne({ name: streamerName });
    if (!user) {
        return res.status(400).send({ error: "No sheet was found for that twitch channel" });
    }
    const link = user.sheetLink;
    const doc = await getDoc(link);
    const sheet = doc.sheetsByTitle["Chat"];

    try {
        await sheet.addRows(batches.get(streamerName));
        batches.set(streamerName, []);
        let avg = currentSum.get(streamerName) / currentUsers.get(streamerName).length;
        await sheet.addRow({
            Card: currentCard.get(streamerName),
            Rating: avg,
            User: "CHAT AVERAGE"
        });
        await Stat.findOneAndUpdate({ name: "cardsRated" }, { $inc: { value: 1 } });
        res.status(200).send({ card: currentCard.get(streamerName), avg });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: "Error in loading the sheet" });

    }

});

app.post("/api/format", async (req, res) => {
    const { streamerName } = req.body;
    const user = await User.findOne({ name: streamerName });
    if (!user) {
        res.status(400).send({ error: "No sheet was found for that twitch channel" });
        return;
    }
    const link = user.sheetLink;
    try {
        const doc = await getDoc(link);
        const sheet = doc.sheetsByTitle["Chat"];
        if (!sheet) {
            return res.status(400).send({ error: 'You don\'t have a "Chat" sheet!' });
        }
        const rows = await sheet.getRows();
        let map = new Map();
        let users = new Set();
        users.add("CHAT AVERAGE");
        rows.forEach((row) => {
            let [card, rating, user] = row._rawData;
            users.add(user);
            if (map.has(card)) {
                map.get(card).set(user, rating);
            } else {
                let newMap = new Map();
                newMap.set(user, rating);
                map.set(card, newMap);
            }
        });

        const newSheet = await doc.addSheet({
            title: "Chat formatted",
        });
        await newSheet.resize({ rowCount: newSheet.rowCount, columnCount: users.size + 1 });
        await newSheet.setHeaderRow(["Card", ...users]);

        let newRows = [];
        map.forEach(async (userRatingMap, card) => {
            let obj = {};
            userRatingMap.forEach((rating, user) => {
                obj = { ...obj, [user]: rating }
            });
            newRows.push({
                Card: card,
                ...obj
            })
        });
        await newSheet.addRows(newRows);

        res.status(200).send({ success: true });
    } catch (e) {
        console.log(e);
        res.status(400).send({ error: "You must not have a Chat formatted sheet" });
    }

});

const isMessageRatingValid = (messageRating) => {
    return messageRating && messageRating > 0 && messageRating < 5;
}

app.get("/api/botStats", async (req, res) => {
    const payload = await Stat.find({});
    res.status(200).send(payload);
});



app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server running on port 5000!');
});
