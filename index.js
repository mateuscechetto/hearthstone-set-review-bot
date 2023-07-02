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

app.get('/test', (req, res) => {
    res.status(200).send({ message: "it works" })
})

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(express.static('public'));
app.use(session({ secret: SESSION_SECRET, resave: true, saveUninitialized: false, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/api/botStats", async (req, res) => {
    const payload = await Stat.find({});
    res.status(200).send(payload);
});

require("./controllers/authController")(app);
require("./controllers/botController")(app);


//app.use(express.static('client/build'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log('Server running on port 5000!');
});
