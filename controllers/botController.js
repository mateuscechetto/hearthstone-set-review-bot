require("dotenv").config();
const tmi = require("tmi.js");
const express = require("express");
const status = require('http-status');
const User = require("../models/user");
const Card = require('../models/card');
const Rating = require('../models/rating');
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const apicache = require('apicache');
let cache = apicache.middleware;

const CACHE_TIME = '5 minutes';


const isMessageRatingValid = (messageRating) => {
    return messageRating && messageRating > 0 && messageRating < 5;
}

const currentExpansion = "Whizbang\'s Workshop";
const minRatings = 1;

const cardsPerExpansion = {
    "Whizbang\'s Workshop": 145,
    "Showdown in the Badlands": 145,
    "Delve into Deepholm": 38,
};

const hasExpansionBeingRated = {
    "Whizbang\'s Workshop": true,
    "Showdown in the Badlands": true,
    "Delve into Deepholm": true,
}

router.get('/ratedCards', async (req, res) => {
    const { userName, expansion } = req.query;
    const activeExpansion = expansion || currentExpansion;
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
            $match: { 'cardData.expansion': activeExpansion },
        },
        {
            $project: {
                _id: 0,
                card: '$cardData',
                hsClass: '$cardData.hsClass',
                extraCards: '$cardData.extraCards',
                rating: 1,
                chatRating: 1,
                createdAt: 1,
            },
        },
    ]);

    return res.status(status.OK).send(cards);
});

router.get('/compareRatings', async (req, res) => {
    const { userName, expansion } = req.query;
    const activeExpansion = expansion || currentExpansion;

    try {
        const user = await User.findOne({ name: userName });
        if (!user) {
            return res.status(status.BAD_REQUEST).send({ error: "Invalid user" });
        }

        const pipeline = [
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
                $match: { 'cardData.expansion': activeExpansion },
            },
            {
                $project: {
                    _id: 0,
                    card: '$cardData',
                    hsClass: '$cardData.hsClass',
                    extraCards: '$cardData.extraCards',
                    rating: 1,
                    chatRating: 1,
                    createdAt: 1,
                },
            },
        ]

        const cards = await Rating.aggregate(pipeline);

        const cardsWithUser = {
            user: { name: user.name, image: user.image },
            cards: cards
        }

        return res.status(status.OK).send(cardsWithUser);
    } catch (err) {
        console.error(err);
        return res.status(status.INTERNAL_SERVER_ERROR).send({ error: 'Error fetching ratings', err });
    }
});

router.get('/users', async (req, res) => {
    const { expansion } = req.query;
    const activeExpansion = expansion || currentExpansion;
    const cardsCount = cardsPerExpansion[activeExpansion];
    const expansionHasHSRRatings = hasExpansionBeingRated[activeExpansion];
    try {
        const pipeline = [
            {
                $match: { expansion: activeExpansion },
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
                    totalDeviation: {
                        $cond: [
                            expansionHasHSRRatings,
                            { $add: ['$totalDeviation', { $multiply: [9, { $subtract: [cardsCount, '$count'] }] }] },
                            0
                        ]
                    },
                    score: {
                        $cond: [
                            expansionHasHSRRatings,
                            { $subtract: [9, { $divide: [{ $add: ['$totalDeviation', { $multiply: [9, { $subtract: [cardsCount, '$count'] }] }] }, cardsCount] }] },
                            0
                        ]
                    },
                    rated: '$countRated',
                },
            },
            {
                $match: {
                    rated: { $gte: minRatings },
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

router.get('/hotCards', cache(CACHE_TIME), async (req, res) => {
    const { expansion } = req.query;
    const activeExpansion = expansion || currentExpansion;
    try {
        const pipeline = [
            {
                $match: { expansion: activeExpansion },
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
                    description: { $first: '$description' },
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
                    description: 1,
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
                    description: 1,
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

router.get('/homeStats', cache(CACHE_TIME), async (req, res) => {
    const { expansion } = req.query;
    const activeExpansion = expansion || currentExpansion;
    try {
        const pipeline = [
            {
                $match: { expansion: activeExpansion },
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

router.get('/averageRatingsByClass', cache(CACHE_TIME), async (req, res) => {
    const { expansion } = req.query;
    const activeExpansion = expansion || currentExpansion;
    try {
        const pipeline = [
            {
                $match: { expansion: activeExpansion },
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
                                card: currentCard.get(streamerName)?._id,
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
                                const stopRecordingMessage = `__________________________________________________ The ratings for ${currentCard.get(streamerName)?.name} ended! \n Chat average: ${avg} __________________________________________________`;
                                tmiClient.say(channel, stopRecordingMessage);
                                sentStopRecordingMessage.set(streamerName, true);
                            }
                        });

                }
            } else {
                if (!sentStartRecordingMessage.get(streamerName)) {
                    const stopRecordingMessage = `__________________________________________________ The ratings for ${currentCard.get(streamerName)?.name} started! Give your rating by typing a number from 1 to 4 __________________________________________________`;
                    tmiClient.say(channel, stopRecordingMessage);
                    sentStartRecordingMessage.set(streamerName, true);
                }

                if (message.length > 1) return;

                const isBot = botNames.includes(tags.username.toLowerCase());
                if (isBot) return;

                let messageRating = parseInt(message);
                if (isMessageRatingValid(messageRating)) {
                    const streamer = await User.findOne({ name: streamerName });
                    let user = await User.findOne({ name: tags['display-name'] });
                    if (!user) {
                        await User.create({ name: tags['display-name'] });
                        user = await User.findOne({ name: tags['display-name'] });
                    }
                    const update = {
                        user: user._id,
                        streamer: streamer._id,
                        card: currentCard.get(streamerName)?._id,
                        rating: messageRating,
                    };
                    await Rating.findOneAndUpdate({ user: user._id, card: currentCard.get(streamerName)?._id }, update, { upsert: true });
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
                card: currentCard.get(streamerName)?._id,
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
                const streamerChatRating = await Rating.findOneAndUpdate({ user: streamer._id, card: currentCard.get(streamerName)?._id }, { chatRating: avg }, { new: true }).populate({
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