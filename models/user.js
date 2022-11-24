const mongoose = require('../database/database');

const UserSchema = new mongoose.Schema({
    name: String,
    sheetLink: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;