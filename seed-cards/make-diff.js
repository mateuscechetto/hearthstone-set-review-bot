const fs = require('fs');
const path = require('path');

function findUniqueCards(json1, json2) {
    const names1 = new Set(json1.cards.map(card => card.name));
    return json2.cards.filter(card => !names1.has(card.name));
}

const file1 = 'from-api.json'; 
const file1Path = path.join(__dirname, file1);

const file1Data = JSON.parse(fs.readFileSync(file1Path, 'utf8'));

const file2 = 'from-api-updated.json'; 
const file2Path = path.join(__dirname, file2);

const file2Data = JSON.parse(fs.readFileSync(file2Path, 'utf8'));

const uniqueCards = findUniqueCards(file1Data, file2Data);

const outputJSON = {
    cards: uniqueCards
};

const formattedDate = new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '_');
const outputFile = `diff_${formattedDate}.json`;
const outputFilePath = path.join(__dirname, outputFile);

fs.writeFileSync(outputFilePath, JSON.stringify(outputJSON, null, 2), 'utf8');
