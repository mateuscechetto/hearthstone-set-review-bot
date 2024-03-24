/**
 * Adds final ratings to the cards.
 * Input: -i Path to the final ratings JSON file
 */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const Card = require('../../models/card');
const mongoose = require('../../database/database');


async function addRating() {
    const argv = yargs
        .option('input', {
            alias: 'i',
            description: 'Path to the JSON file',
            demandOption: true,
        })
        .help()
        .alias('help', 'h')
        .argv;

    const inputFile = path.resolve(argv.input);
    const originalData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

    let counter = 0;

    for (const card of originalData) {
        await Card.updateOne({ dbf_id: card.dbf_id }, { $set: { hsr_rating: card.rating } });
        counter++;
        console.log(`${counter} - Added rating ${card.rating} to ${card.name}`);
    }

    await mongoose.disconnect();
}

addRating();


