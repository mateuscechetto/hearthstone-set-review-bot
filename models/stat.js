const mongoose = require('../database/database');

const StatSchema = new mongoose.Schema({
    name: String,
    value: {
        type: Number,
        default: 0
    }
});

const Stat = mongoose.model("Stat", StatSchema);

module.exports = Stat;