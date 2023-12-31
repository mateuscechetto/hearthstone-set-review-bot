require("dotenv").config();
const tmi = require("tmi.js");
const express = require("express");
const status = require('http-status');
const User = require("../models/user");
const Card = require('../models/card');
const Rating = require('../models/rating');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const isMessageRatingValid = (messageRating) => {
    return messageRating && messageRating > 0 && messageRating < 5;
}

const currentExpansion = "Showdown in the Badlands";
const minRatings = 30;

router.get('/ratedCards', async (req, res) => {
    const { userName } = req.query;
    const user = await User.findOne({ name: userName });
    if (!user) {
        return res.status(status.BAD_REQUEST).send({ error: "Invalid user" });
    }
    const cards = await Rating.aggregate([
        {
            $match: { user: user._id },
        },
        {
            $lookup: {
                from: 'hearthstonecards',
                localField: 'card',
                foreignField: '_id',
                as: 'cardData',
            },
        },
        {
            $unwind: '$cardData',
        },
        {
            $match: { 'cardData.expansion': currentExpansion },
        },
        {
            $lookup: {
                from: 'hearthstonecards',
                localField: 'cardData.extraCards',
                foreignField: '_id',
                as: 'cardData.extraCards',
            },
        },
        {
            $project: {
                _id: 0,
                card: '$cardData',
                rating: 1,
                createdAt: 1,
            },
        },
    ]);

    return res.status(status.OK).send(cards);
});

router.get('/users', async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { expansion: currentExpansion },
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'card',
                    as: 'ratings',
                },
            },
            {
                $unwind: '$ratings',
            },
            {
                $project: {
                    _id: 0,
                    user: '$ratings.user',
                    hsr_rating: '$hsr_rating',
                    userRating: '$ratings.rating',
                },
            },
            {
                $project: {
                    user: '$user',
                    deviation: {
                        $abs: { $subtract: ['$hsr_rating', '$userRating'] },
                    },
                    isRated: { $gt: ['$userRating', 0] }, // Check if the rating is greater than 0
                },
            },
            {
                $group: {
                    _id: '$user',
                    totalDeviation: { $sum: { $pow: ['$deviation', 2] } },
                    count: { $sum: 1 },
                    countRated: { $sum: { $cond: ['$isRated', 1, 0] } },
                },
            },
            {
                $lookup: {
                    from: 'users', 
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userData',
                },
            },
            {
                $unwind: '$userData',
            },
            {
                $project: {
                    _id: 0,
                    name: '$userData.name',
                    image: '$userData.image',
                    view_count: '$userData.view_count',
                    isStreamer: '$userData.isStreamer',
                    sheetLink: '$userData.sheetLink',
                    followers: '$userData.followers',
                    totalDeviation: '$totalDeviation', 
                    score: { $subtract: [9, {$divide: ['$totalDeviation' , '$count']}] },
                    rated: '$countRated',
                },
            },
            {
                $match: {
                    rated: { $gt: minRatings },
                },
            },
            {
                $sort: {
                    'followers': -1,
                },
            }
        ];

        const results = await Card.aggregate(pipeline);
        return res.status(status.OK).send(results);
    } catch (err) {
        console.log(err);
        return res.status(status.INTERNAL_SERVER_ERROR).send({ error: 'Error fetching the users', err });
    }
});

router.get('/hotCards', async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { expansion: currentExpansion },
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'card',
                    as: 'ratings',
                },
            },
            {
                $unwind: '$ratings',
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    hsClass: { $first: '$hsClass' },
                    imageURL: { $first: '$imageURL' },
                    ratings: { $push: '$ratings.rating' },
                    hsr_rating: { $first: '$hsr_rating' },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    hsClass: 1,
                    imageURL: 1,
                    ratings: {
                        $filter: {
                            input: '$ratings',
                            as: 'rating',
                            cond: { $ne: ['$$rating', 0] },
                        },
                    },
                    hsr_rating: 1,
                },
            },
            {
                $project: {
                    name: 1,
                    hsClass: 1,
                    imageURL: 1,
                    ratings: 1,
                    avgRating: { $avg: '$ratings' },
                    standardDeviation: { $stdDevSamp: '$ratings' },
                    hsr_rating: 1,
                },
            },
            {
                $sort: {
                    avgRating: -1,
                },
            },
        ];
        const results = await Card.aggregate(pipeline);
        return res.status(status.OK).send(results);
    } catch (error) {
        console.log(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send({ error: 'Error fetching the cards', error });
    }
});

router.get('/homeStats', async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { expansion: currentExpansion },
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'card',
                    as: 'ratings',
                },
            },
            {
                $unwind: '$ratings',
            },
            {
                $group: {
                    _id: '$_id',
                    name: { $first: '$name' },
                    hsClass: { $first: '$hsClass' },
                    imageURL: { $first: '$imageURL' },
                    ratings: { $push: '$ratings.rating' },
                    hsr_rating: { $first: '$hsr_rating' },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    hsClass: 1,
                    imageURL: 1,
                    ratings: {
                        $filter: {
                            input: '$ratings',
                            as: 'rating',
                            cond: { $ne: ['$$rating', 0] },
                        },
                    },
                    hsr_rating: 1,
                },
            },
            {
                $project: {
                    name: 1,
                    hsClass: 1,
                    imageURL: 1,
                    ratings: 1,
                    avgRating: { $avg: '$ratings' },
                    standardDeviation: { $stdDevSamp: '$ratings' },
                    hsr_rating: 1,
                },
            },
            {
                $sort: {
                    avgRating: -1,
                },
            },
        ];

        const results = await Card.aggregate(pipeline);

        const bestCards = results.slice(0, 5);
        const worstCards = results.slice(-5).sort((a, b) => a.avgRating - b.avgRating);
        const standardDeviationCards = results
            .slice() // Create a shallow copy of the array
            .sort((a, b) => b.standardDeviation - a.standardDeviation)
            .slice(0, 5);

        const response = {
            bestCards,
            worstCards,
            standardDeviationCards,
        };

        return res.status(status.OK).send(response);
    } catch (err) {
        console.log(err);
        return res.status(status.INTERNAL_SERVER_ERROR).send({ error: 'Error fetching the cards', err });
    }
});

router.get('/averageRatingsByClass', async (req, res) => {
    try {
        const pipeline = [
            {
                $match: { expansion: currentExpansion },
            },
            {
                $lookup: {
                    from: 'ratings',
                    localField: '_id',
                    foreignField: 'card',
                    as: 'ratings',
                },
            },
            {
                $unwind: '$ratings',
            },
            {
                $match: {
                    'ratings.rating': { $ne: 0 }, // Exclude ratings with value 0
                },
            },
            {
                $group: {
                    _id: '$hsClass',
                    avgRating: { $avg: '$ratings.rating' },
                    numRatings: { $sum: 1 },
                    avg_hsr_rating: { $avg: '$hsr_rating' },
                },
            },
            {
                $project: {
                    _id: 0,
                    hsClass: '$_id',
                    avgRating: 1,
                    numRatings: 1,
                    avg_hsr_rating: 1,
                },
            },
            {
                $sort: {
                    avgRating: -1,
                },
            },
        ];

        const results = await Card.aggregate(pipeline);
        return res.status(status.OK).json(results);
    } catch (error) {
        console.error(error);
        return res.status(status.INTERNAL_SERVER_ERROR).send({ error: 'Error fetching the cards' }, error);
    }
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
                    await Rating.findOneAndUpdate({ user: user._id, card: currentCard.get(streamerName)._id }, update, { upsert: true });
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
        return res.status(status.NOT_FOUND).send({ error: "Twtich channel not found" });
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
                res.status(status.OK).send(streamerChatRating);
            }
        });

});

module.exports = app => app.use('/api', router);