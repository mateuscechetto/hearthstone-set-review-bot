require("dotenv").config();
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

    return res.status(status.OK).send(cards);
});

router.use(authMiddleware);

// TODO: Make it stateless
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
                    await Rating.findOneAndUpdate({ user: user._id, card: currentCard.get(streamerName)._id }, update, { upsert: true, returnDocument: "after" });
                    await Stat.findOneAndUpdate({ name: "ratings" }, { $inc: { value: 1 } });
                }
            }
        });
    }
    activeTMIs.set(streamerName, true);
    res.status(status.OK).send({ message: "recording chat" });

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
                res.status(status.INTERNAL_SERVER_ERROR).send({ error: 'Error calculating average rating', err });
            } else {
                avg = result.length > 0 ? result[0].averageRating : 0;
                const streamerChatRating = await Rating.findOneAndUpdate({ user: streamer._id, card: currentCard.get(streamerName)._id }, { chatRating: avg }, { new: true }).populate({
                    path: 'card',
                    populate: {
                        path: 'extraCards',
                    },
                });
                await Stat.findOneAndUpdate({ name: "cardsRated" }, { $inc: { value: 1 } });
                res.status(status.OK).send(streamerChatRating);
            }
        });

});

module.exports = app => app.use('/api', router);