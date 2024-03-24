/**
 * Adds the cards to the database from a json of transformed data with extraCards.
 * Input: -i Path to the transformed data JSON file.
 */

const Card = require("../../models/card");

const fs = require("fs");
const path = require("path");
const yargs = require('yargs');

const argv = yargs
  .option('input', {
    alias: 'i',
    description: 'Path to the input JSON file',
    demandOption: true,
  })
  .help()
  .alias('help', 'h')
  .argv;


const inputFile = path.resolve(argv.input);
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));


Card.insertMany(data.cards, (err) => {
  if (err) {
    console.error("Error saving HearthstoneCard objects:", err);
  } else {
    console.log("HearthstoneCard objects saved successfully.");
  }
});
