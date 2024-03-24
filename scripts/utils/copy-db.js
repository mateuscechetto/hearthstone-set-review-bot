/**
 * Retrieves database data and save it in json files.
 */

const fs = require('fs');
const User = require('../../models/user');
const Card = require('../../models/card');
const Rating = require('../../models/rating');
const mongoose = require('../../database/database');

async function getDBDataAndCreateJSONFiles() {
    try {
        // Fetch all from the database
        const users = await User.find({}).lean();
        const cards = await Card.find({}).lean();
        const ratings = await Rating.find({}).lean();

        // Write data to a JSON file
        const jsonUserData = JSON.stringify(users, null, 2); // Indentation of 2 spaces for better readability
        fs.writeFileSync('users.json', jsonUserData);

        const jsonCardsData = JSON.stringify(cards, null, 2); // Indentation of 2 spaces for better readability
        fs.writeFileSync('cards.json', jsonCardsData);
        
        const jsonRatingsData = JSON.stringify(ratings, null, 2); // Indentation of 2 spaces for better readability
        fs.writeFileSync('ratings.json', jsonRatingsData);

        // Disconnect from MongoDB
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

getDBDataAndCreateJSONFiles();