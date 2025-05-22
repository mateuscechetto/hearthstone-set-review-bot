/**
 * Adds names to cards.
 * Used for when we collect hsreplay data.
 * 
 * Input: -i Path to the data file
 *        -c Path to the collection file (extracted from  https://api.hearthstonejson.com/v1/latest/enUS/cards.collectible.json)
 *        -s Name of the expansion
 */

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');

const argv = yargs
    .option('input', {
        alias: 'i',
        description: 'Path to data file',
        demandOption: true,
    })
    .option('collection', {
        alias: 'c',
        description: 'Path to the collection file',
        demandOption: true,
    })
    .option('set', {
        alias: 's',
        description: 'Name of the expansion',
        demandOption: true,
    })
    .help()
    .alias('help', 'h')
    .argv;


const statsFile = path.resolve(argv.input);
const statsData = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
const statsCards = statsData.cards;

const collectionFile = path.resolve(argv.collection);
const collection = JSON.parse(fs.readFileSync(collectionFile, 'utf8'));

// c.isMiniSet
const expansionCards = collection.filter(c => c.set === argv.set);

const filteredStats = statsCards.filter(card => expansionCards.find(c => c.dbfId == card.dbf_id));

const cardWithName = filteredStats.map(stat => {
    return { ...stat, name: expansionCards.find(c => c.dbfId == stat.dbf_id).name, neutral: expansionCards.find(c => c.dbfId == stat.dbf_id).classId == 12 }
});

console.log(cardWithName.length)

const formattedDate = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '_');
const outputFile = `data/with_names_${formattedDate}.json`;
const outputFilePath = path.join(__dirname, outputFile);

fs.writeFileSync(outputFilePath, JSON.stringify(cardWithName, null, 2), 'utf8');

console.log(`Transformation completed. The output is saved as ${outputFile}`);
