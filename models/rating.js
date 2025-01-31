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

RatingSchema.index({ user: 1 });
RatingSchema.index({ card: 1 });
RatingSchema.index({ user: 1, card: 1 });

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;