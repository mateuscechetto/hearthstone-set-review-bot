const mongoose = require('../database/database');

const UserSchema = new mongoose.Schema({
    name: String,
    image: String,
    view_count: Number,
    isStreamer: {
        type: Boolean,
    },
    sheetLink: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;