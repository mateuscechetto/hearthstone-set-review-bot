const mongoose = require('../database/database');

const UserSchema = new mongoose.Schema({
    name: String,
    image: String,
    view_count: Number,
    isStreamer: {
        type: Boolean,
    },
    sheetLink: String,
    followers: {
        type: Number,
        required: false,
    },
    hasUpdatedFollowersCount: {
        type: Boolean,
        default: false,
    },
});

UserSchema.index({ name: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;