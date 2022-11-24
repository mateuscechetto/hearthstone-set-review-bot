require("dotenv").config();
const mongoose = require("mongoose");


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i9wcwa4.mongodb.net/database?retryWrites=true&w=majority`);

mongoose.Promise = global.Promise;

module.exports = mongoose;
