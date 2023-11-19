const fs = require('fs');
const User = require('../models/user');
const Card = require('../models/card');
const Rating = require('../models/rating');
const mongoose = require('../database/database');

async function addDataFromJSONToDB() {
    try {
        // Read data from .json files
        const usersJsonData = fs.readFileSync('seed-cards/data/users.json', 'utf8');
        const users = JSON.parse(usersJsonData);

        const cardsJsonData = fs.readFileSync('seed-cards/data/cards.json', 'utf8');
        const cards = JSON.parse(cardsJsonData);

        const ratingsJsonData = fs.readFileSync('seed-cards/data/ratings.json', 'utf8');
        const ratings = JSON.parse(ratingsJsonData);

        // Insert the data into the MongoDB database
        await User.insertMany(users);
        console.log('Users added to MongoDB.');

        await Card.insertMany(cards);
        console.log('Cards added to MongoDB.');

        await Rating.insertMany(ratings);
        console.log('Ratings added to MongoDB.');

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Successfully added the data to the db.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

addDataFromJSONToDB();