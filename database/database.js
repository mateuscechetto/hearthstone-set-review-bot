require('dotenv').config();
const mongoose = require("mongoose");

mongoose.connect(process.env.TEST_DB_URL);

mongoose.Promise = global.Promise;

module.exports = mongoose;
