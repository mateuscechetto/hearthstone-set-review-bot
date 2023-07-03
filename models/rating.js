const mongoose = require('../database/database');

const RatingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HearthstoneCard',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
  },
  chatRating: {
    type: Number,
    min: 1,
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