/**
 * Transforms Blizzard API data from https://hearthstone.blizzard.com/en-us/cards to the format used on the application.
 * Extra cards need to be added manually after running this script.
 * Input: -i Path to the API JSON file
 */

const fs = require('fs');
const path = require('path');
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
const originalData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

const transformedData = {
  cards: originalData.cards.map(card => ({
    dbf_id: card.id,
    name: card.name,
    description: stripHtmlTags(card.text),
    imageURL: card.image,
    expansion: 'The Great Dark Beyond',
    mana: card.manaCost,
    type: transformType(card.cardTypeId),
    hsClass: transformClass(card.classId),
    rarity: transformRarity(card.rarityId),
    extraCardsIds: Array.isArray(card.childIds) && card.childIds.length > 0 ? card.childIds : undefined
  }))
};

const formattedDate = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '_');
const outputFile = `output_zeph_${formattedDate}.json`;
const outputFilePath = path.join(__dirname, outputFile);

fs.writeFileSync(outputFilePath, JSON.stringify(transformedData, null, 2), 'utf8');

console.log('Transformation completed. The output is saved as output.json');

function stripHtmlTags(input) {
  return input.replace(/<[^>]*>?/gm, ''); // This regex removes all HTML tags
}

function transformType(input) {
  const types = {
    '4': 'Minion',
    '5': 'Spell',
    '7': 'Weapon',
  }
  return types[input];
}

function transformClass(input) {
  const classes = {
    '1': 'Death Knight',
    '2': 'Druid',
    '3': 'Hunter',
    '4': 'Mage',
    '5': 'Paladin',
    '6': 'Priest',
    '7': 'Rogue',
    '8': 'Shaman',
    '9': 'Warlock',
    '10': 'Warrior',
    '12': 'Neutral',
    '14': 'Demon Hunter',
  }
  return classes[input];
}

function transformRarity(input) {
  const rarity = {
    '1': 'Common',
    '3': 'Rare',
    '4': 'Epic',
    '5': 'Legendary',
  }
  return rarity[input];
}