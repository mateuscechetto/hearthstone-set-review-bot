const mongoose = require('../database/database');

const RatingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  streamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HearthstoneCard',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 4,
    required: true,
  },
  chatRating: {
    type: Number,
    min: 0,
    max: 4,
    required: false,
  },
  review: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;