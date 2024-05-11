/**
 * Creates a diff file from 2 jsons from Blizzard API https://hearthstone.blizzard.com/en-us/cards.
 * Usually, expansion cards are revealed in different times, 
 * so this script is useful to add only the cards that were not added to the application yet.
 * Also useful for minisets because Blizzard API treats miniset cards as expansion cards.
 * Input: -o: Path to the older JSON file.
 *        -n: Path to the newer JSON file.
 */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .option('old', {
        alias: 'o',
        description: 'Path to the older JSON file',
        demandOption: true,
    })
    .option('new', {
        alias: 'n',
        description: 'Path to the new JSON file',
        demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .argv;


function findUniqueCards(json1, json2) {
    const names1 = new Set(json1.cards.map(card => card.name));
    return json2.cards.filter(card => !names1.has(card.name));
}

const file1 = path.resolve(argv.old);
const file1Data = JSON.parse(fs.readFileSync(file1, 'utf8'));

const file2 = path.resolve(argv.new);
const file2Data = JSON.parse(fs.readFileSync(file2, 'utf8'));

const uniqueCards = findUniqueCards(file1Data, file2Data);

const outputJSON = {
    cards: uniqueCards
};

const formattedDate = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '_');
const outputFile = `diff_${formattedDate}.json`;
const outputFilePath = path.join(__dirname, outputFile);

fs.writeFileSync(outputFilePath, JSON.stringify(outputJSON, null, 2), 'utf8');
