const card = require('./models/card');

const createCards = async () => {

    simpleCards = [
        {
            name: 'Embrace of Nature',
            description: 'Draw a Choose One card. Forge: It has both effects combined.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/606bf2094d6c65f5467d12ceb6e737bfe08b9d13e1f303b02f4b00f4d9e4f160.png',
            expansion: 'TITANS',
            mana: 1,
            type: 'Spell',
            hsClass: 'Druid',
            rarity: 'Rare',
        },
        {
            name: 'Hodir, Father of Giants',
            description: 'Battlecry: Set the stats of the next three minions you play to 8/8.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2ab9c19936b8b97ee17e085ef0a84a117a060d9539995d48d7f68914342ab2ac.png',
            expansion: 'TITANS',
            mana: 8,
            type: 'Minion',
            hsClass: 'Hunter',
            rarity: 'Legendary',
            atk: 8,
            health: 8,
        },
        {
            name: 'Inquisitive Creation',
            description: 'Battlecry: Deal damage to all enemy minions. (Improved by each spell school you\'ve cast this game!)',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/7715d19e2ab5d485b422c912d469052250dfce7df0f888271141af1c3d898d97.png',
            expansion: 'TITANS',
            mana: 4,
            type: 'Minion',
            hsClass: 'Mage',
            rarity: 'Rare',
            atk: 3,
            health: 4,
        },
        {
            name: 'Noble Minibot',
            description: 'Magnetic After this attacks, give a random minion in your hand +1/+1.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/101cebfab773b60dc26bb1fa64a9e7c0281b89c40b5c63398ef4792805ab627a.png',
            expansion: 'TITANS',
            mana: 2,
            type: 'Minion',
            hsClass: 'Paladin',
            rarity: 'Common',
            atk: 2,
            health: 3,
        },
        {
            name: 'Tyr',
            description: 'Battlecry: Resurrect a 2, 3, and 4-Attack Paladin minion.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/12d66b38744b0aac0a79ba18d83a10408aaf81249888b65a250d75e723403f3f.png',
            expansion: 'TITANS',
            mana: 7,
            type: 'Minion',
            hsClass: 'Paladin',
            rarity: 'Legendary',
            atk: 4,
            health: 5,
        },
        {
            name: 'SP-3Y3-D3R',
            description: 'Magnetic Stealth for 1 turn.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a7bc7ca2dbbaaa5858ccaea0ce1307a234c1242fbd99f7612c37301aa4e8ad63.png',
            expansion: 'TITANS',
            mana: 3,
            type: 'Minion',
            hsClass: 'Rogue',
            rarity: 'Common',
            atk: 3,
            health: 4,
        },
        {
            name: 'Cyclopian Crusher',
            description: 'Rush Forge: Gain +3/+2.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/491ef053ba6bb442ce6a41d1f8bb25aa1a5414ce7aa4c701784503900e0fc161.png',
            expansion: 'TITANS',
            mana: 3,
            type: 'Minion',
            hsClass: 'Neutral',
            rarity: 'Common',
            atk: 3,
            health: 3,
        },
        {
            name: 'Fate Splitter',
            description: 'Deathrattle: Get a copy of the card that killed this.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/cd1d1d6213aec614d5cddf011436e38aedf6d53f937a55894dcb878fb75953d1.png',
            expansion: 'TITANS',
            mana: 3,
            type: 'Minion',
            hsClass: 'Neutral',
            rarity: 'Epic',
            atk: 3,
            health: 3,
        },
        {
            name: 'Prison of Yogg-Saron',
            description: 'Choose a character. Cast 4 random spells (targeting it if possible).',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a973bdebb8869397f44e99dd7d45da1ad35a2f81453a8ed4dd79fcb16d529a49.png',
            expansion: 'TITANS',
            mana: 7,
            type: 'Location',
            hsClass: 'Neutral',
            rarity: 'Legendary',
            health: 3,
        },
        {
            name: 'Son of Hodir',
            description: 'Battlecry: Shuffle four 8/8 Giants into your deck that are summoned when drawn.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/cf0bef9978b1f2f260038fc168369f5a946b13c2506a4c492c65386ba3e37bf4.png',
            expansion: 'TITANS',
            mana: 8,
            type: 'Minion',
            hsClass: 'Neutral',
            rarity: 'Epic',
            atk: 8,
            health: 8,
        },
    ]

    await card.create(simpleCards, (err, savedCards) => {
        if (err) {
            console.error('Error saving cards:', err);
        } else {
            console.log('Cards saved successfully:', savedCards);
        }
    });

    extraCardsEonar = [
        {
            name: 'Spontaneous Growth',
            description: 'Draw cards until your hand is full.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/54bef6f506764c5d519ee5254ade637db880441afd8f26c765eb33b272d57ff3.png',
            expansion: 'TITANS',
            mana: 0,
            type: 'Spell',
            hsClass: 'Druid',
            rarity: 'Extra',
        },
        {
            name: 'Bountiful Harvest',
            description: 'Restore your hero to full health.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/c346fb66e58f75dbbfcaaecfe7ba76c0c0100230711be4db5e77742bec16d073.png',
            expansion: 'TITANS',
            mana: 0,
            type: 'Spell',
            hsClass: 'Druid',
            rarity: 'Extra',
        },
        {
            name: 'Flourish',
            description: 'Refresh your Mana Crystals.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/218b8162ca373da20c68e27ea711aa0eb9910ef6e9167d972baed44f84348fc1.png',
            expansion: 'TITANS',
            mana: 0,
            type: 'Spell',
            hsClass: 'Druid',
            rarity: 'Extra',
        },
    ];

    await card.create(extraCardsEonar[0], async (err, extraCard1) => {
        if (err) {
            console.error('Error saving extraCard1:', err);
        } else {
            await card.create(extraCardsEonar[1], async (err, extraCard2) => {
                if (err) {
                    console.error('Error saving extraCard2:', err);
                } else {
                    await card.create(extraCardsEonar[2], async (err, extraCard3) => {
                        if (err) {
                            console.error('Error saving extraCard3:', err);
                        } else {
                            await card.create({
                                name: 'Eonar, the Life-Binder',
                                description: 'Titan After this uses an ability, summon a 5/5 Ancient with Taunt.',
                                imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1833647c6c79da353da6d8fdd2c2b0dec1e2b8ee9dd45d9d81883916d9d1f67f.png',
                                expansion: 'TITANS',
                                mana: 10,
                                type: 'Minion',
                                hsClass: 'Druid',
                                rarity: 'Legendary',
                                atk: 5,
                                health: 7,
                                extraCards: [extraCard1._id, extraCard2._id, extraCard3._id],
                            }, (err, savedCard) => {
                                if (err) {
                                    console.error('Error saving card:', err);
                                } else {
                                    console.log('Card successfully:', savedCard);
                                }
                            });
                        }
                    });
                }
            });
        }
    });


    extraCardsNorgannon = [
        {
            name: 'Progenitor\'s Power',
            description: 'Deal 5 damage.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/8d191040eb7dcfb12f8ed0eaec59a0fc47997bd9e2368f188efdd4b06f288ed6.png',
            expansion: 'TITANS',
            mana: 0,
            type: 'Spell',
            hsClass: 'Mage',
            rarity: 'Extra',
        },
        {
            name: 'Ancient Knowledge',
            description: 'Enemy cards cost (1) more next turn.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/20d37b0bf30564371e12d14a4c2110c4c3e22aee6d4f0a0fd15efcc948311108.png',
            expansion: 'TITANS',
            mana: 0,
            type: 'Spell',
            hsClass: 'Mage',
            rarity: 'Extra',
        },
        {
            name: 'Unlimited Potential',
            description: 'Cast 1 random mage secret.',
            imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/1f11918b9b4e9a0d9e667181cd535e448cef7d55801b503782f48e8140122d60.png',
            expansion: 'TITANS',
            mana: 0,
            type: 'Spell',
            hsClass: 'Mage',
            rarity: 'Extra',
        },
    ];

    await card.create(extraCardsNorgannon[0], async (err, extraCard1) => {
        if (err) {
            console.error('Error saving extraCard1:', err);
        } else {
            await card.create(extraCardsNorgannon[1], async (err, extraCard2) => {
                if (err) {
                    console.error('Error saving extraCard2:', err);
                } else {
                    await card.create(extraCardsNorgannon[2], async (err, extraCard3) => {
                        if (err) {
                            console.error('Error saving extraCard3:', err);
                        } else {
                            await card.create({
                                name: 'Norgannon',
                                description: 'Titan After this uses an ability, double the power of the other abilities.',
                                imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/87916496496323809f3b847049cf7965b0b6c89699490c458089a2f040696f52.png',
                                expansion: 'TITANS',
                                mana: 6,
                                type: 'Minion',
                                hsClass: 'Mage',
                                rarity: 'Legendary',
                                atk: 3,
                                health: 8,
                                extraCards: [extraCard1._id, extraCard2._id, extraCard3._id],
                            }, (err, savedCard) => {
                                if (err) {
                                    console.error('Error saving card:', err);
                                } else {
                                    console.log('Card successfully:', savedCard);
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    extraCardForgeOfWills = {
        name: 'Ironbound Giant',
        description: 'Rush',
        imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/090a1ab02bc208aae2ad4d660c6f5afddc5e4ee3ca6e522f971425e0c4b39fea.png',
        expansion: 'TITANS',
        mana: 1,
        type: 'Minion',
        hsClass: 'Warlock',
        rarity: 'Extra',
    };

    await card.create(extraCardForgeOfWills, async (err, extraCard1) => {
        if (err) {
            console.error('Error saving extraCard1:', err);
        } else {
            await card.create({
                name: 'Forge of Wills',
                description: 'Choose a friendly minion. Summon a Giant with its stats and Rush.',
                imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/9d2aafd0eb8eacd119e00d6d267c505576e9f4e9a4ea47b2a4b7c02d651bd20d.png',
                expansion: 'TITANS',
                mana: 3,
                type: 'Location',
                hsClass: 'Warlock',
                rarity: 'Rare',
                health: 2,
                extraCards: [extraCard1._id],
            }, (err, savedCard) => {
                if (err) {
                    console.error('Error saving card:', err);
                } else {
                    console.log('Card successfully:', savedCard);
                }
            });
        }
    });
}

createCards();


