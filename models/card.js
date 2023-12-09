const mongoose = require('../database/database');

const HearthstoneCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: true
  },
  expansion: {
    type: String,
    required: true
  },
  dbf_id: {
    type: Number,
    required: false,
  },
  hsr_rating: {
    type: Number,
    required: false,
  },
  mana: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['Minion', 'Spell', 'Weapon', 'Hero', 'Location', 'Quest'],
    required: false,
  },
  hsClass: {
    type: String,
    enum: ['Death Knight', 'Demon Hunter', 'Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior', 'Neutral'],
    required: true,
  },
  attack: {
    type: Number,
    required: false,
  },
  health: {
    type: Number,
    required: false,
  },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary', 'Extra', 'Basic'],
    required: false,
  },
  extraCards: [
    {
      name: {
        type: String,
        required: true,
      },
      imageURL: {
        type: String,
        required: true
      },
      expansion: {
        type: String,
        required: true
      },
      hsClass: {
        type: String,
        enum: ['Death Knight', 'Demon Hunter', 'Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior', 'Neutral'],
        required: true,
      },
      rarity: {
        type: String,
        enum: ['Common', 'Rare', 'Epic', 'Legendary', 'Extra', 'Basic'],
        required: true,
      },
    }
  ],
});

const HearthstoneCard = mongoose.model('HearthstoneCard', HearthstoneCardSchema);

module.exports = HearthstoneCard;