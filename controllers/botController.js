require("dotenv").config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const tmi = require("tmi.js");
const express = require("express");
const status = require('http-status');
const User = require("../models/user");
const Stat = require('../models/stat');
const Card = require('../models/card');
const Rating = require('../models/rating');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const isMessageRatingValid = (messageRating) => {
    return messageRating && messageRating > 0 && messageRating < 5;
}

router.get('/ratedCards', async (req, res) => {
    const { userName } = req.query;
    const user = await User.findOne({ name: userName });
    if (!user) {
        return res.status(status.BAD_REQUEST).send({ error: "Invalid user" });
    }
    const cards = await Rating.find({ user: user._id }).populate({
        path: 'card',
        populate: {
            path: 'extraCards',
        },
    });

    return res.status(200).send(cards);
});

router.use(authMiddleware);

let activeTMIs = new Map();
let currentCard = new Map();
let sentStopRecordingMessage = new Map();
let sentStartRecordingMessage = new Map();

const botNames = ["streamelements", "nightbot"];

router.post('/rateCard', async (req, res) => {
    const { cardName, rating } = req.body;
    const userName = req.userName;

    const user = await User.findOne({ name: userName });
    if (!user) {
        return res.status(status.BAD_REQUEST).send({ error: "Invalid user" });
    }
    const card = await Card.findOne({ name: cardName });
    if (!card) {
        return res.status(status.BAD_REQUEST).send({ error: "Invalid card" });
    }

    const update = {
        user: user._id,
        card: card._id,
        rating: rating,
    };

    const ratingObj = await Rating.findOneAndUpdate({ user: user._id, card: card._id }, update, {
        new: true,
        upsert: true
    });

    return res.status(status.CREATED).send(ratingObj);
});

router.post("/record", async (req, res) => {
    const { cardName } = req.body;
    const streamerName = req.userName;

    if (activeTMIs.has(streamerName)) {
        const card = await Card.findOne({ name: cardName });
        currentCard.set(streamerName, card);
        sentStartRecordingMessage.set(streamerName, false);
        sentStopRecordingMessage.set(streamerName, false);
    } else {
        const card = await Card.findOne({ name: cardName });
        currentCard.set(streamerName, card);
        sentStartRecordingMessage.set(streamerName, false);
        sentStopRecordingMessage.set(streamerName, false);

        const tmiClient = new tmi.Client({
            identity: {
                username: process.env.USERNAME,
                password: process.env.PASSWORD,
            },
            channels: [streamerName]
        });
        tmiClient.connect();
        tmiClient.on('message', async (channel, tags, message, self) => {
            if (self) return;
            if (!activeTMIs.get(streamerName)) {
                if (!sentStopRecordingMessage.get(streamerName)) {
                    const streamer = await User.findOne({ name: streamerName });
                    Rating.aggregate([
                        {
                            $match: {
                                card: currentCard.get(streamerName)._id,
                                streamer: streamer._id
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                averageRating: { $avg: '$rating' }
                            }
                        }
                    ])
                        .exec((err, result) => {
                            if (err) {
                                console.error('Error calculating average rating:', err);
                            } else {
                                avg = result.length > 0 ? result[0].averageRating : 0;
                                const stopRecordingMessage = `__________________________________________________ The ratings for ${currentCard.get(streamerName).name} ended! \n Chat average: ${avg} __________________________________________________`;
                                tmiClient.say(channel, stopRecordingMessage);
                                sentStopRecordingMessage.set(streamerName, true);
                            }
                        });

                }
            } else {
                if (!sentStartRecordingMessage.get(streamerName)) {
                    const stopRecordingMessage = `__________________________________________________ The ratings for ${currentCard.get(streamerName).name} started! Give your rating by typing a number from 1 to 4 __________________________________________________`;
                    tmiClient.say(channel, stopRecordingMessage);
                    sentStartRecordingMessage.set(streamerName, true);
                }
                await Stat.findOneAndUpdate({ name: "messagesRead" }, { $inc: { value: 1 } });

                const isBot = botNames.includes(tags.username.toLowerCase());
                if (isBot) return;

                let messageFirstChar = message.slice(0, 1);
                let messageRating = parseInt(messageFirstChar);
                //messageRating = Math.floor(Math.random() * 5);
                if (isMessageRatingValid(messageRating)) {
                    const streamer = await User.findOne({ name: streamerName });
                    let user = await User.findOne({ name: tags.username });
                    if (!user) {
                        await User.create({ name: tags.username });
                        user = await User.findOne({ name: tags.username });
                    }
                    const update = {
                        user: user._id,
                        streamer: streamer._id,
                        card: currentCard.get(streamerName)._id,
                        rating: messageRating,
                    };
                    const alreadyRated = await Rating.findOne({ user: user._id, card: card._id });
                    if (alreadyRated) {
                        await Rating.findOneAndUpdate({ user: user._id, card: card._id }, update);
                    } else {
                        await Rating.create(update);
                    }

                    await Stat.findOneAndUpdate({ name: "ratings" }, { $inc: { value: 1 } });
                }
            }
        });
    }
    activeTMIs.set(streamerName, true);
    res.status(200).send({ message: "recording chat" });

});

router.post("/stop", async (req, res) => {
    const streamerName = req.userName;
    activeTMIs.set(streamerName, false);
    const streamer = await User.findOne({ name: streamerName });
    if (!streamer) {
        return res.status(400).send({ error: "Twtich channel not found" });
    }
    let avg;
    Rating.aggregate([
        {
            $match: {
                card: currentCard.get(streamerName)._id,
                streamer: streamer._id
            }
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating' }
            }
        }
    ])
        .exec(async (err, result) => {
            if (err) {
                console.error('Error calculating average rating:', err);
                res.status(500).send({ error: 'Error calculating average rating', err });
            } else {
                avg = result.length > 0 ? result[0].averageRating : 0;
                const streamerChatRating = await Rating.findOneAndUpdate({ user: streamer._id, card: currentCard.get(streamerName)._id }, { chatRating: avg }, { new: true }).populate({
                    path: 'card',
                    populate: {
                        path: 'extraCards',
                    },
                });
                await Stat.findOneAndUpdate({ name: "cardsRated" }, { $inc: { value: 1 } });
                res.status(200).send(streamerChatRating);
            }
        });



});

// router.post("/record", async (req, res) => {
//     const { cardName } = req.body;
//     const streamerName = req.userName;

//     if (activeTMIs.has(streamerName)) {
//         currentCard.set(streamerName, cardName);
//         currentSum.set(streamerName, 0);
//         currentUsers.set(streamerName, []);
//         batches.set(streamerName, []);
//     } else {
//         currentCard.set(streamerName, cardName);
//         currentSum.set(streamerName, 0);
//         const user = await User.findOne({ name: streamerName });
//         if (!user) {
//             return res.status(400).send({ error: "No sheet was found for that twitch channel" });
//         }
//         const link = user.sheetLink;
//         try {
//             const doc = await getDoc(link);
//             const sheet = doc.sheetsByTitle["Chat"];
//             const rows = await sheet.getRows();
//         } catch (e) {
//             console.log(e);
//             return res.status(400).send({ error: "There was an error connecting to the \"Chat\" sheet" });
//         }
//         currentUsers.set(streamerName, []);
//         batches.set(streamerName, []);


//         const tmiClient = new tmi.Client({
//             identity: {
//                 username: process.env.USERNAME,
//                 password: process.env.PASSWORD,
//             },
//             channels: [streamerName]
//         });
//         tmiClient.connect();
//         tmiClient.on('message', async (channel, tags, message, self) => {
//             if (self) return;
//             if (!activeTMIs.get(streamerName)) {
//                 if (!sentStopRecordingMessage) {
//                     const avg = currentSum.get(streamerName) / currentUsers.get(streamerName).length;
//                     const stopRecordingMessage = `__________________________________________________ The ratings for ${currentCard.get(streamerName)} ended! \n Chat average: ${avg} __________________________________________________`;
//                     tmiClient.say(channel, stopRecordingMessage);
//                     sentStopRecordingMessage = true;
//                 }
//             } else {
//                 if (!sentStartRecordingMessage) {
//                     const stopRecordingMessage = `__________________________________________________ The ratings for ${currentCard.get(streamerName)} started! Give your rating by typing a number from 1 to 4 __________________________________________________`;
//                     tmiClient.say(channel, stopRecordingMessage);
//                     sentStartRecordingMessage = true;
//                 }
//                 await Stat.findOneAndUpdate({ name: "messagesRead" }, { $inc: { value: 1 } });

//                 const isBot = botNames.includes(tags.username.toLowerCase());
//                 if (isBot) return;

//                 let messageFirstChar = message.slice(0, 1);
//                 let messageRating = parseInt(messageFirstChar);
//                 //messageRating = Math.floor(Math.random() * 5);
//                 if (isMessageRatingValid(messageRating)) {
//                     const haveRatedAlready = currentUsers.get(streamerName).includes(tags.username);
//                     if (!haveRatedAlready) {
//                         batches.get(streamerName).push({
//                             Card: currentCard.get(streamerName),
//                             Rating: messageRating,
//                             User: tags.username
//                         });
//                         currentUsers.get(streamerName).push(tags.username);
//                         currentSum.set(streamerName, currentSum.get(streamerName) + messageRating);
//                         await Stat.findOneAndUpdate({ name: "ratings" }, { $inc: { value: 1 } });
//                     } else {
//                         let batch = batches.get(streamerName);
//                         batch.forEach((row) => {
//                             if (row.User === tags.username) {
//                                 currentSum.set(streamerName, currentSum.get(streamerName) + messageRating - row.Rating);
//                                 row.Rating = messageRating;
//                             }
//                         });
//                         batches.set(streamerName, batch);
//                         // let index = batch.findIndex((row) => row.User == tags.username);
//                         // if (index >= 0) {
//                         //     currentSum.set(streamerName, currentSum.get(streamerName) + messageRating - batch[index].Rating);
//                         //     batch[index] = { ...batch[index], Rating: messageRating };
//                         //     batches.set(streamerName, batch);
//                         // }

//                     }

//                 }

//             }

//         });
//     }
//     activeTMIs.set(streamerName, true);
//     res.status(200).send({ message: "recording chat" });

// });

// router.post("/stop", async (req, res) => {
//     const streamerName = req.userName;
//     activeTMIs.set(streamerName, false);
//     const user = await User.findOne({ name: streamerName });
//     if (!user) {
//         return res.status(400).send({ error: "No sheet was found for that twitch channel" });
//     }
//     const link = user.sheetLink;
//     const doc = await getDoc(link);
//     const sheet = doc.sheetsByTitle["Chat"];

//     try {
//         const avg = currentSum.get(streamerName) / currentUsers.get(streamerName).length;
//         const map = new Map();
//         const users = new Set();
//         await sheet.loadHeaderRow();
//         const headers = sheet.headerValues;
//         const rows = batches.get(streamerName);
//         rows.push({
//             Card: currentCard.get(streamerName),
//             Rating: avg,
//             User: "CHAT AVERAGE"
//         });
//         users.add("CHAT AVERAGE");
//         headers.forEach((user) => {
//             users.add(user);
//         });
//         rows.forEach((row) => {
//             let { Card, Rating, User } = row;
//             users.add(User);
//             if (map.has(Card)) {
//                 map.get(Card).set(User, Rating);
//             } else {
//                 let newMap = new Map();
//                 newMap.set(User, Rating);
//                 map.set(Card, newMap);
//             }
//         });
//         users.delete("Card");

//         await sheet.resize({ rowCount: sheet.rowCount, columnCount: users.size + 1, frozenColumnCount: 2, frozenRowCount: 1 });
//         await sheet.setHeaderRow(["Card", ...users]);

//         let newRows = [];
//         map.forEach((userRatingMap, card) => {
//             let obj = {};
//             userRatingMap.forEach((rating, user) => {
//                 obj = { ...obj, [user]: rating }
//             });
//             newRows.push({
//                 Card: card,
//                 ...obj
//             })
//         });
//         await sheet.addRows(newRows);
//         batches.set(streamerName, []);
//         await Stat.findOneAndUpdate({ name: "cardsRated" }, { $inc: { value: 1 } });
//         res.status(200).send({ card: currentCard.get(streamerName), avg });
//     } catch (e) {
//         console.log(e);
//         res.status(400).send({ error: "Error in loading the sheet" });

//     }

// });

module.exports = app => app.use('/api', router);