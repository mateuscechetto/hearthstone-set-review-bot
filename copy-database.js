require('dotenv').config();
const mongoose = require("mongoose");

async function transferData() {
  try {
    const productionDB = mongoose.createConnection(process.env.PROD_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to production database.');


    // Create the schemas
    const UserSchema = new mongoose.Schema({
      name: String,
      image: String,
      view_count: Number,
      isStreamer: {
        type: Boolean,
      },
      followers: {
        type: Number,
        required: false,
      },
      hasUpdatedFollowersCount: {
        type: Boolean,
        default: false,
      },
    });

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

    const usersModel = productionDB.model('User', UserSchema);
    const users = await usersModel.find({}).lean();
    const cardsModel = productionDB.model('HearthstoneCard', HearthstoneCardSchema);
    const cards = await cardsModel.find({}).lean();
    const ratingsModel = productionDB.model('Rating', RatingSchema);
    const ratings = await ratingsModel.find({}).lean();
    console.log('Loaded production data.');

    await productionDB.close();
    console.log('Disconnected from production database.');


    const developmentDB = await mongoose.createConnection(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to development database.');


    // Register the models for the collections in the development database
    const developmentUserModel = developmentDB.model('User', UserSchema);
    const developmentCardsModel = developmentDB.model('HearthstoneCard', HearthstoneCardSchema);
    const developmentRatingsModel = developmentDB.model('Rating', RatingSchema);


    // Clear existing data in the development collections (if needed)
    await developmentUserModel.deleteMany();
    await developmentCardsModel.deleteMany();
    await developmentRatingsModel.deleteMany();

    // Insert the fetched data into the development database
    await developmentUserModel.insertMany(users);
    await developmentCardsModel.insertMany(cards);
    await developmentRatingsModel.insertMany(ratings);

    console.log('Data transferred to development database.');



    // Disconnect from the development database
    await developmentDB.close();
    console.log('Disconnected from development database.');


  } catch (error) {
    console.error('An error occurred:', error);
  }
}

transferData();