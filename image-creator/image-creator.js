const Jimp = require('jimp');
const axios = require('axios');

const BACKGROUND_PATH = './image-creator/background/boom.png';
const TEXT_USERNAME = 'molino_hs';
const TEXT_EXPANSION = 'Dr. Boom\'s miniset Review';
const MARGIN_TOP = 50;
const MARGIN_LEFT = 182;
const CARD_HEIGHT = 300;
const CARD_WIDTH = 415;

const MOLINO_IMAGES = [
    'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/10af4751cf3157f5e0cf1511eb1c2761cead802117caecc338435187843861c6.png', // Favorite
    'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/725a4e77942e9b3957e3da7858248ee560912ffb13046d801d47c63ba2058532.png', // Underrated
    'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/4b9bd28c0c0816f4dcc4696b8f9cd05277a81c1896013f8eebb456534163e222.png', // Best
    'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/3213d26ac9d19d6f47093290410823febf91d8e5e3d66491ef3cb4287d62dbfa.png'  // Overrated
]

async function getImageFromURL(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching image from URL: ${error.message}`);
    }
}

/**
 * Generates a image to be shared on Twitter with card images and text.
 * @param {string} username
 * @param {string[]} [cardsImages] URLs of 4 card images to include in the Twitter image. They must foollow the order: - Favorite - Underrated - Best - Overrated
 * @returns {Promise<Jimp>} Promise resolving to the generated image.
 */
async function createTwitterImage(username = TEXT_USERNAME, cardsImages = MOLINO_IMAGES) {
    try {
        // Load the background image
        const background = await Jimp.read(BACKGROUND_PATH);

        for (let i = 0; i < 4; i++) {

            // Load the image to place from URL
            const imageBuffer = await getImageFromURL(cardsImages[i]);
            const image = await Jimp.read(imageBuffer);

            image.resize(CARD_HEIGHT, Jimp.AUTO);

            // Calculate the position to place the image
            const x = (i >> 1) * 415;
            const y = (i & 1) * 500;

            // Composite the images
            background.composite(image, x + MARGIN_LEFT, y + 300);
        }


        // Load a font
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

        const textUsernameWidth = Jimp.measureText(font, username);
        const TEXT_USERNAME_X = (background.bitmap.width - textUsernameWidth) / 2;
        background.print(font, TEXT_USERNAME_X, MARGIN_TOP, username);

        const textExpansionWidth = Jimp.measureText(font, TEXT_EXPANSION);
        const TEXT_EXPANSION_X = (background.bitmap.width - textExpansionWidth) / 2;
        background.print(font, TEXT_EXPANSION_X, MARGIN_TOP + 65, TEXT_EXPANSION);


        // Save the result
        // await background.writeAsync('./image-creator/output/output.png');
        return background;
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = createTwitterImage;