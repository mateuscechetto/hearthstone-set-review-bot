require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const request = require("request");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Card = require('../models/card');
const Rating = require('../models/rating');

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;
const TWITCH_CALLBACK_URL = process.env.TWITCH_CALLBACK_URL;

const FRONTEND_URL = process.env.FRONTEND_URL;


OAuth2Strategy.prototype.userProfile = (accessToken, done) => {
    var options = {
        url: 'https://api.twitch.tv/helix/users',
        method: 'GET',
        headers: {
            'Client-ID': TWITCH_CLIENT_ID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Authorization': 'Bearer ' + accessToken
        }
    };

    request(options, (error, res, body) => {
        if (res && res.statusCode == 200) {
            done(null, JSON.parse(body));
        } else {
            done(JSON.parse(body));
        }
    });
}

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use('twitch', new OAuth2Strategy({
    authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
    tokenURL: 'https://id.twitch.tv/oauth2/token',
    clientID: TWITCH_CLIENT_ID,
    clientSecret: TWITCH_SECRET,
    callbackURL: TWITCH_CALLBACK_URL,
    state: true
}, async (accessToken, refreshToken, profile, done) => {
    profile.accessToken = accessToken;
    profile.refreshToken = refreshToken;

    const { display_name, profile_image_url, view_count } = profile.data[0];


    const update = {
        name: display_name,
        image: profile_image_url,
        view_count: view_count
    };

    const userToken = jwt.sign({ name: update.name }, process.env.JWT_SECRET);
    profile.userToken = userToken;

    let user = await User.findOne({ name: display_name });
    if (!user) {
        const created = await User.create(update);
        const cards = await Card.find({ rarity: { $ne: 'Extra' } });
        const ratings = cards.map(card => ({
            user: created._id,
            card: card._id,
            rating: 0
        }));

        await Rating.insertMany(ratings);

    } else {
        user = await User.findOneAndUpdate({ name: display_name }, update);
    }


    done(null, profile);
}
));

// Set route to start OAuth link, this is where you define scopes to request
router.get('/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// Set route for OAuth redirect
router.get('/twitch/callback', passport.authenticate('twitch', { successRedirect: FRONTEND_URL, failureRedirect: FRONTEND_URL }));

router.get('/login/success', (req, res) => {
    if (req.user) {
        const user = {
            name: req.user.data[0].display_name,
            image: req.user.data[0].profile_image_url,
            view_count: req.user.data[0].view_count,
            userToken: req.user.userToken
        }
        res.status(200).send(
            user
        );
    } else {
        res.status(404).send();
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(FRONTEND_URL);
});

router.get('/hasUser', async (req, res) => {
    const regex = new RegExp(["^", req.query.username.toLowerCase(), "$"].join(""), "i");
    const hasUser = !!await User.exists({ name: regex });
    res.status(200).send(
        hasUser
    );
});

router.get('/user', async (req, res) => {
    const regex = new RegExp(["^", req.query.username.toLowerCase(), "$"].join(""), "i");
    const user = await User.findOne({ name: regex });
    res.status(200).send(
        user
    );
});

module.exports = app => app.use('/api/auth', router);