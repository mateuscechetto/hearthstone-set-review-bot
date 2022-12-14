require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const request = require("request");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

    const { display_name, profile_image_url, email, view_count } = profile.data[0];


    const update = {
        name: display_name,
        imageURL: profile_image_url,
        email: email,
        view_count: view_count
    };

    const userToken = jwt.sign({ name: update.name }, process.env.JWT_SECRET);
    profile.userToken = userToken;

    let user = await User.findOneAndUpdate({ name: display_name }, update, {
        new: true,
        upsert: true
    });

    done(null, profile);
}
));

// Set route to start OAuth link, this is where you define scopes to request
router.get('/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// Set route for OAuth redirect
router.get('/twitch/callback', passport.authenticate('twitch', { successRedirect: FRONTEND_URL, failureRedirect: FRONTEND_URL }));

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).send({
            user: req.user
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(FRONTEND_URL);
});

module.exports = app => app.use('/api/auth', router);