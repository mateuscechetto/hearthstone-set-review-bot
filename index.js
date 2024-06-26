const express = require("express");
const cors = require("cors");
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const Stat = require('./models/stat');
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: [
        "http://localhost:4200"
    ], credentials: true
}));

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.static('public'));
const sessionMiddleware = session({ secret: SESSION_SECRET, resave: true, saveUninitialized: false, cookie: { secure: false } });
module.exports = { server, sessionMiddleware};
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/botStats", async (req, res) => {
    const payload = await Stat.find({});
    res.status(200).send(payload);
});

require("./controllers/imageController")(app);
require("./controllers/authController")(app);
require("./controllers/botController")(app);


app.use(express.static('client/dist/hs-set-review'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/hs-set-review/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server running on port 5000!');
});
