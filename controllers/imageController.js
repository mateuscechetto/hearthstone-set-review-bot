require("dotenv").config();
const express = require("express");
const router = express.Router();
const status = require('http-status');
const authMiddleware = require("../middlewares/auth");
const createTwitterImage = require('../image-creator/image-creator');
const Jimp = require('jimp');


router.get('/generateTwitterImage', async (req, res) => {
    const { userName, cards } = req.query;

    if (!userName) {
        console.error('Missing username');
        return res.status(status.BAD_REQUEST).send({ error: 'Missing username' });
    }

    if (!cards) {
        console.error('Missing cards');
        return res.status(status.BAD_REQUEST).send({ error: 'Missing cards' });
    }

    const parsedCards = JSON.parse(cards);

    if (parsedCards.length !== 4) {
        console.error('Cards length must be 4');
        return res.status(status.BAD_REQUEST).send({ error: 'Cards length must be 4' });
    }

    try {

        const image = await createTwitterImage(userName, parsedCards);

        res.setHeader('Content-Disposition', 'attachment; filename="generated_image.png"');
        res.setHeader('Content-Type', 'image/png');

        // Send the image data to the client
        res.send(await image.getBufferAsync(Jimp.MIME_PNG));


    } catch (error) {
        console.error('Error generating image:', error);
        res.status(status.INTERNAL_SERVER_ERROR).send('Error generating image');
    }

});

module.exports = app => app.use('/api/image', router);