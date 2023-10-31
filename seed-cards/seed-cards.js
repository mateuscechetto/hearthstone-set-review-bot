const Card = require("../models/card");

const excavateCards = [
    {
        "name": "Escaping Trogg",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Escaping-Trogg-300x419.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Fool\"s Azerite",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Fools-Azerite-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Punch of Coins",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Pouch-of-Coins-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Rock",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Rock-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Watrer Source",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Water-Source-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Azerite Chunk",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Azerite-Chunk-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Canary",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Canary-215x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Falling Stalactite",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Falling-Stalactite-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Glowing Glyph",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Glowing-Glyph-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Living Stone",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Living-Stone-215x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Azerite Gem",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Azerite-Gem-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Collapse!",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Collapse-211x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Motherlode Drake",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Motherlode-Drake-215x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Ogrefist Boulder",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Ogrefist-Boulder-206x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    },
    {
        "name": "Steelhide Mole",
        "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/Steelhide-Mole-215x300.png",
        "expansion": "Showdown in the Badlands",
        "hsClass": "Neutral",
        "rarity": "Extra"
    }
];

const DKExcavateLegendary = {
    "name": "The Azerite Rat",
    "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2efe758acc3156263486926c2818b9e71ac25efe30f5fdd51f86167a83f9c3b7.png",
    "expansion": "Showdown in the Badlands",
    "hsClass": "Death Knight",
    "rarity": "Extra"
};

const WarlockExcavateLegendary = {
    "name": "The Azerite Snake",
    "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/The-Azerite-Snake-210x300.png",
    "expansion": "Showdown in the Badlands",
    "hsClass": "Warlock",
    "rarity": "Extra"
};

const MageExcavateLegendary = {
    "name": "The Azerite Hawk",
    "imageURL": "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2023/10/The-Azerite-Hawk-210x300.png",
    "expansion": "Showdown in the Badlands",
    "hsClass": "Mage",
    "rarity": "Extra"
};

const RogueExcavateLegendary = {
    "name": "The Azerite Scorpion",
    "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/28cd14d79ecde03243d004b0a2f17afde5a7134a73a142ac87400bbf25953f20.png",
    "expansion": "Showdown in the Badlands",
    "hsClass": "Rogue",
    "rarity": "Extra"
};

const barrel = {
    "name": "Barrel of Sludge",
    "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/37dfa5339b4269990fff81ac236260523d38e40b53c635b75dfba6db2775b279.png",
    "expansion": "Showdown in the Badlands",
    "hsClass": "Neutral",
    "rarity": "Extra"
};

const tramCar = {
    "name": "Tram Car",
    "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2f7527fff3f6d8113b29706812e091b8bdf7aa0f189e4db013d2a0e8104562ed.png",
    "expansion": "Showdown in the Badlands",
    "hsClass": "Neutral",
    "rarity": "Warlock"
};


const DKCards = [
    {
        name: "Fistful of Corpses",
        description: "Deal damage to a minion equal to your Corpses.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/9f154e6312ca424381c374ca09e2972b184a02e9afcb0bf2b12970cf53655197.png",
        expansion: "Showdown in the Badlands",
        mana: 1,
        type: "Spell",
        hsClass: "Death Knight",
        rarity: "Common",
    },
    {
        name: "Pile of Bones",
        description: "Deathrattle: The next time you Excavate, resummon this.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/22f612b45655edf26004fc03b825e6f91aa7ae5c624c80aae097878c952acca1.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Minion",
        hsClass: "Death Knight",
        rarity: "Rare",
    },
    {
        name: "Corpse Farm",
        description: "Spend up to 8 Corpses to summon a random minion of that Cost.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/01594f13d0dc8c71381f726a4ab60b4d8a0b78cd7b6f0cf5ca0d9c491c9b5b3b.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Spell",
        hsClass: "Death Knight",
        rarity: "Epic",
    },
    {
        name: "Crop Rotation",
        description: "Summon four 1/1 Undead with Rush that die at the end of turn.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/00718fad7467cc68fec708523830d1763a15b7a3380aa5f266d614f586821041.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Spell",
        hsClass: "Death Knight",
        rarity: "Rare",
        extraCards: [
            {
                "name": "Gnome on the Range",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2e865375de0094377305d5d47edd3d100ae65b57590952ab67fee36693420048.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Death Knight",
                "rarity": "Extra"
            }
        ]
    },
    {
        name: "Farm Hand",
        description: "Battlecry: Discover an Undead. Quickdraw: It costs (2) less.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/f0a4aa9a57f16fb93a27b7e7922bec8f648a951c90f1b7b6f4fa0a296f69fc6e.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Minion",
        hsClass: "Death Knight",
        rarity: "Common",
    },
    {
        name: "Reap What You Sow",
        description: "Deal 3 damage. Excavate a treasure.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/c2e29ffb0b6f6cc69822bbaab967bef85cf7c1d189adaeb0d06529289ac03473.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Spell",
        hsClass: "Death Knight",
        rarity: "Common",
    },
    {
        name: "Maw and Paw",
        description: "At the end of your turn, gain 5 Corpses. At the start of your turn, spend 5 Corpses to give your hero +5 Health.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ad49868d84e8f737d06d2645c5eddf51c544e3e167b4e6362fb48fad074a1c4a.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Minion",
        hsClass: "Death Knight",
        rarity: "Legendary",
    },
    {
        name: "Skeleton Crew",
        description: "Battlecry: Excavate a treasure. It costs (0).",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/30966ec4133a2bf9a83eb357f40d601fd6f6f611dddcb7c3db7e010cefe3049a.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Minion",
        hsClass: "Death Knight",
        rarity: "Rare",
        extraCards: [DKExcavateLegendary, ...excavateCards]
    },
    {
        name: "Harrowing Ox",
        description: "Taunt Battlecry: If you\"ve Excavated twice, your next card this turn costs (7) less.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/b89ec1bde3b6319d17b8fd4677315a4d06c11b4f8b74616fd27e88c6d5722253.png",
        expansion: "Showdown in the Badlands",
        mana: 7,
        type: "Minion",
        hsClass: "Death Knight",
        rarity: "Epic",
    },
    {
        name: "Reska, the Pit Boss",
        description: "Rush. Costs (1) less for each minion that died this game. Deathrattle: Take control of a random enemy minion.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/8bd39b119d44276fe940862dd36bd2581630a584eb80a47b399f7a25821f57d6.png",
        expansion: "Showdown in the Badlands",
        mana: 20,
        type: "Minion",
        hsClass: "Death Knight",
        rarity: "Legendary",
    },

];

// {
//     name: "Holy Springwater",
//     description: "Restore 8 Health to a damaged character. Save any excess in a 1-Cost Bottle.",
//     imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/4292c4baed0eae8ba27f3093d092c91c1c35d6a57fbbf2a90b3f9ce88c9ddfe2.png",
//     expansion: "Showdown in the Badlands",
//     mana: 2,
//     type: "Spell",
//     hsClass: "Priest",
//     rarity: "Common",
//     extraCards: [
//         {
//             "name": "Bottled Springwater",
//             "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/f9f78bcc3a8043063a88b3f0682bd03ae99283dcef85c4aefa33cce5d3377533.png",
//             "expansion": "Showdown in the Badlands",
//             "hsClass": "Priest",
//             "rarity": "Extra"
//         }
//     ]
// },

const DHCards = [
    {
        name: "Oasis Outlaws",
        description: "Discover a Naga. If you\"ve played a Naga while holding this, reduce its Cost by (1).",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/82f21f2e6ce64b6a307e1e719adbc161d87dab42c93e768f720b37b27ffff633.png",
        expansion: "Showdown in the Badlands",
        mana: 1,
        type: "Spell",
        hsClass: "Demon Hunter",
        rarity: "Common",
    },
    {
        name: "Bartend-O-Bot",
        description: "Battlecry: Draw an Outcast card and slide it to the left side of your hand.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/5037ef0434201722d40c42396699715604bd50ac5d99b3971c259f5a6a4878c2.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Minion",
        hsClass: "Demon Hunter",
        rarity: "Epic",
    },
    {
        name: "Parched Desperado",
        description: "Battlecry: If you\"ve cast a spell while holding this, give your hero +3 Attack this turn.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/9b41f6f5bf275f441b59d8fc12fba446f871bad389d1b30555f40170b2bedcd2.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Minion",
        hsClass: "Demon Hunter",
        rarity: "Rare",
    },
    {
        name: "Pocket Sand",
        description: "Deal 3 damage. Quickdraw: Your opponent\"s next card costs (1) more.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/d71d449c67360a5047d8c9f735fec40c0273e7a7eea1fdf3842244d9dd35ee35.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Spell",
        hsClass: "Demon Hunter",
        rarity: "Common",
    },
    {
        name: "Blindeye Sharpshooter",
        description: "After you play a Naga, deal 2 damage to a random enemy and draw a spell. (Then switch!) After you cast a spell, deal 2 damage to a random enemy and draw a Naga. (Then switch!)",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e5db405b34b5e4daa70788ebe764d264e00ac5808bb6b53e4e7d0b9ac118cfa7.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Minion",
        hsClass: "Demon Hunter",
        rarity: "Epic",
    },
    {
        name: "Load the Chamber",
        description: "Deal 2 damage. Your next Naga, Fel spell, and weapon cost (1) less.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/00103d0962eb70e1a9936d111dc57171d16546fbbdeae6c7e19fc18c16a8cd1a.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Spell",
        hsClass: "Demon Hunter",
        rarity: "Rare",
    },
    {
        name: "Snake Eyes",
        description: "Battlecry: Roll two dice, then Discover two cards of those Costs. (Doubles get an extra Discover!)",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/4f8d7c03c7d2646bdf7f0835cafec3dc0af57a395d1e61a1062fdad68d730dcc.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Minion",
        hsClass: "Demon Hunter",
        rarity: "Legendary",
        extraCards: [
            {
                name: "Rolled a One!",
                imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/28b17af33b92e35aa8e7ff0e598e854d7e6182861da9b9d309cd72df6f26c0b2.png",
                expansion: "Showdown in the Badlands",
                hsClass: "Demon Hunter",
                rarity: "Extra"
            },
            {
                name: "Rolled a Two!",
                imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/7cf65cb4f10f2868ea631d863610489c605844c59519be421f4b55ef3bcc19e0.png",
                expansion: "Showdown in the Badlands",
                hsClass: "Demon Hunter",
                rarity: "Extra"
            },
            {
                name: "Rolled a Three!",
                imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/f6c6e253e54fd8a005fbb87c8f26d56ae4d4c521ff35034224f1913c6bfa9bd4.png",
                expansion: "Showdown in the Badlands",
                hsClass: "Demon Hunter",
                rarity: "Extra"
            },
            {
                name: "Rolled a Four!",
                imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/8d5b5dd20c7474820bd2b3ef504e86bebab6b4b83a7dea83090a810ff3e4db72.png",
                expansion: "Showdown in the Badlands",
                hsClass: "Demon Hunter",
                rarity: "Extra"
            },
            {
                name: "Rolled a Five!",
                imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a2305c9181a7011321663ca858280cf5fdd6130c40f01c7ef3342124b81e0c63.png",
                expansion: "Showdown in the Badlands",
                hsClass: "Demon Hunter",
                rarity: "Extra"
            },
            {
                name: "Rolled a Six!",
                imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/b3382007ef385bf64956a39164fc9bb3a0ab6329d1a60e49baaa08627f69e96d.png",
                expansion: "Showdown in the Badlands",
                hsClass: "Demon Hunter",
                rarity: "Extra"
            },
        ]
    },
    {
        name: "Fan the Hammer",
        description: "Deal 6 damage split among the lowest Health enemies.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/fec694d0dcaffa33e08626a60d0d8a9b5c78b0a912b141d6a3880975a924d7aa.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Spell",
        hsClass: "Demon Hunter",
        rarity: "Rare",
    },
    {
        name: "Gunslinger Kurtrus",
        description: "Battlecry: If your deck has no duplicates, fire 6 random 2 damage shots at minions in the enemy\"s hand.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/fa5e4a0650b0e017362925717d4b3b4b255cbe9bc68090ed4b78c5749f4ea5bd.png",
        expansion: "Showdown in the Badlands",
        mana: 5,
        type: "Minion",
        hsClass: "Demon Hunter",
        rarity: "Legendary",
    },
    {
        name: "Midnight Wolf",
        description: "Rush Outcast: Summon a copy of this.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/06cd752e785286401262a473902b50d728b0b509fbc48c90be2d88a66f84f84c.png",
        expansion: "Showdown in the Badlands",
        mana: 6,
        type: "Minion",
        hsClass: "Demon Hunter",
        rarity: "Common",
    },
];

const druidCards = [
    {
        name: "Cactus Construct",
        description: "Discover a 2-Cost minion. Summon a 1/2 copy of it.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a8581bb8286d18b26f463cc9cf72bb00b29639c40391ea5033cb35b8a0400efc.png",
        expansion: "Showdown in the Badlands",
        mana: 1,
        type: "Spell",
        hsClass: "Druid",
        rarity: "Rare",
    },
    {
        name: "Dragon Tales",
        description: "<b>Choose One -</b> Get two random Dragons that cost (5) or less; or Get two that cost more than (5).",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/76c624b806a3b28824f27509621c45dfc1d0d2a8b977509b345ea9c784fa14c9.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Spell",
        hsClass: "Druid",
        rarity: "Epic",
        extraCards: [
            {
                "name": "Short Stories",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/179d18188035ee7946b3992ace834f3fabe8ae01a516d634acc7af58ef056dea.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Druid",
                "rarity": "Extra"
            },
            {
                "name": "Tall Tales",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e25386e7f528fe7b3ef30f183a56409628253ddf96c7f26281caecb7f2909514.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Druid",
                "rarity": "Extra"
            }
        ]
    },
    {
        name: "Rehydrate",
        description: "Restore 7 Health. <b>Quickdraw:</b> Refresh 2 Mana Crystals.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/31f935ae2ce97c6cf371a467ee6dce8dc970b5476aec1a4b2f192020c399822e.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Spell",
        hsClass: "Druid",
        rarity: "Common",
    },
    {
        name: "Splish-Splash Whelp",
        description: "Battlecry: If you\"re holding a Dragon, gain an empty Mana Crystal.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/4730fafe5b8cc59aaa7ab9e64521f404cdbb7cabbe97b57bdd35ad2f5b4c1ac4.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Minion",
        hsClass: "Druid",
        rarity: "Rare",
    },
    {
        name: "Take to the Skies",
        description: "Draw two Dragons. Give them +1/+1.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/aebc6b2694aa2bd1559192274a4517b84e6f5d9aaff942aa1b550178edfadbc3.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Spell",
        hsClass: "Druid",
        rarity: "Common",
    },
    {
        name: "Desert Nestmatron",
        description: "Taunt. Battlecry: If you\"re holding a Dragon, refresh 4 Mana Crystals.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/f9c6121576ca139dc1949bfa94cdb2d232f6f6f579272dfd9e60a0614d17f733.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Minion",
        hsClass: "Druid",
        rarity: "Rare",
    },
    {
        name: "Spinetail Drake",
        description: "Battlecry: If you\"re holding a Dragon, deal 5 damage to an enemy minion.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/dc0f939235a4680bc94b36f6298d148b9b5afb567794b4773fefdcc54a66f6f2.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Minion",
        hsClass: "Druid",
        rarity: "Common",
    },
    {
        name: "Dragon Golem",
        description: "Taunt Battlecry: Summon a copy of this for each Dragon in your hand.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/54ff7be61afe524328dadca6e1652697d69b69f4be3fd5443dc5878da06ffdcd.png",
        expansion: "Showdown in the Badlands",
        mana: 7,
        type: "Minion",
        hsClass: "Druid",
        rarity: "Epic",
    },
    {
        name: "Rheastrasza",
        description: "Battlecry: If your deck has no duplicates, summon the Purified Dragon Nest.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/bc9b8add05a3d6fae3c426920d156ad11d38635b732033e9de737b866cf3925a.png",
        expansion: "Showdown in the Badlands",
        mana: 8,
        type: "Minion",
        hsClass: "Druid",
        rarity: "Legendary",
        extraCards: [
            {
                "name": "Tall Tales",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/eebdf38664ecce1e9d7ec45e1a8103e6f3f7f02a5d6eeecaa5c2deb2def0db03.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Druid",
                "rarity": "Extra"
            }
        ]
    },
    {
        name: "Fye, the Setting Sun",
        description: "Rush, Lifesteal, Taunt Costs (1) less for each Dragon you\"ve summoned this game.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2c6087d8b99ad246502fb59782aa6b06f99ff0bef4d53537905debde80391057.png",
        expansion: "Showdown in the Badlands",
        mana: 9,
        type: "Minion",
        hsClass: "Druid",
        rarity: "Legendary",
    },

];

const hunterCards = [
    {
        name: "Sneaky Snakes",
        description: "Summon two 1/1 Snakes with Stealth.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/ad4f9b22c28303eed126d142a7135feaf2a9aadd2766514f78fa6863615d79df.png",
        expansion: "Showdown in the Badlands",
        mana: 1,
        type: "Spell",
        hsClass: "Hunter",
        rarity: "Common",
        extraCards: [
            {
                "name": "Sidewinder",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/09f30e91a0180f8f8f1d42c7d7bbe2dfa808af3edb264dfe8f2fdce0f492faf3.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            }
        ]
    },
    {
        name: "Messenger Buzzard",
        description: "<b>Deathrattle:</b> Draw a Beast. Give minions in your hand +1/+1.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/5a3f73a5e26e2153624b3245dc9f8e74471f640674c60ccf13bc4d40d32e9b88.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Minion",
        hsClass: "Hunter",
        rarity: "Common",
    },{
        name: "Messenger Buzzard",
        description: "<b>Deathrattle:</b> Draw a Beast. Give minions in your hand +1/+1.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/5a3f73a5e26e2153624b3245dc9f8e74471f640674c60ccf13bc4d40d32e9b88.png",
        expansion: "Showdown in the Badlands",
        mana: 2,
        type: "Minion",
        hsClass: "Hunter",
        rarity: "Common",
    },
    {
        name: "Bovine Skeleton",
        description: "<b>Deathrattle:</b> If this has 4 or more Attack, summon a Bovine Skeleton.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/904b4a219633b9ba6ad583409e64b08319d94107e1acac9d15e7b19dda749877.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Minion",
        hsClass: "Hunter",
        rarity: "Rare",
    },
    {
        name: "Saddle Up!",
        description: "Give your minions \"<b>Deathrattle:</b> Summon a random Beast that costs (3) or less.\"",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/0ed5669bf7f9786a54e8cdb42eae224bf4c111cba5e3507b5ae3962df4adaa03.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Spell",
        hsClass: "Hunter",
        rarity: "Epic",
    },
    {
        name: "Silver Serpent",
        description: "<b><b>Rush</b>, <b>Poisonous</b> Quickdraw:</b> Gain <b>Immune</b> this turn.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/a6b7f82aca3d1d2487508a8a9cc9bf9008cfb220a8234418938b0e14df611da9.png",
        expansion: "Showdown in the Badlands",
        mana: 3,
        type: "Minion",
        hsClass: "Hunter",
        rarity: "Common",
    },
    {
        name: "Camouflage Mount",
        description: "Give a minion +3/+3 and a random <b>bonus effect</b>. When it dies, summon a Chameleon.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/4e4318599820e834121a9da675c7fcb95e2af3f80566ef7dc2ff896572578b37.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Spell",
        hsClass: "Hunter",
        rarity: "Rare",
        extraCards: [
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/669bfa599716dffa2f233c0cdf70b58a4fffb55c56aa48cef12aa78c9b59dc0e.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/6d0e9d152e07e3ad48c1e93726a8b1fe8eff61544b1048e66184a34d6a5546a2.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/aa4fb62ef9c773eccccebf70c39222a433a28291f5ec7659395ec215b309c337.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/2b9e4808ebf1ab947fc9aaf8eb495fd7659a77c32e2f28a8b4823da4969d4502.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/dc797e8142454620f0cda4be988e3331c5a11db4f6026f24cca8b96452adbbeb.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/79b94ef4b236092922fd6cfd8909022009c298617adfd61baa336a893643779e.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/61a4117645a05e0a22b3682348f4ba019f9c40bb5b8182bfce3bf5f3f47011b0.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            },
            {
                "name": "Chamaleon",
                "imageURL": "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/d07a884c9f078eda47488cfcc636c806d0748e178190284de3d93d2148217a00.png",
                "expansion": "Showdown in the Badlands",
                "hsClass": "Hunter",
                "rarity": "Extra"
            }
        ]
    },
    {
        name: "Starshooter",
        description: "After your hero attacks, get an Arcane Shot.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e28fb6e93c24cf8168e59a13b6039a9f347cfde06b83e542238fd353d5b8f884.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Weapon",
        hsClass: "Hunter",
        rarity: "Epic",
    },
    {
        name: "Theldurin the Lost",
        description: "<b>Battlecry:</b> If your deck has no duplicates, gain <b>Immune</b> this turn and attack all enemies.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/797023b1ada2c2af417d7ab1788e08511cfca537c2f439d9f2a816bcf270fc5d.png",
        expansion: "Showdown in the Badlands",
        mana: 4,
        type: "Minion",
        hsClass: "Hunter",
        rarity: "Legendary",
    },
    {
        name: "Spurfang",
        description: "<b>Battlecry and Deathrattle:</b> Summon a random Beast with Cost equal to this minion\"s Attack.",
        imageURL: "https://d15f34w2p8l1cc.cloudfront.net/hearthstone/caf79d6a0687906253eb5867795dab949168aa90688d565a4ca10849d6441905.png",
        expansion: "Showdown in the Badlands",
        mana: 5,
        type: "Minion",
        hsClass: "Hunter",
        rarity: "Legendary",
    },
];


const createCards = (cards) => {
    Card.insertMany(cards, (err) => {
        if (err) {
            console.error("Error saving HearthstoneCard objects:", err);
        } else {
            console.log("HearthstoneCard objects saved successfully.");
        }
    });
}

// createCards(druidCards);

const fs = require("fs");
const path = require("path");


const file = "output_with_extra_cards.json"; 
const filePath = path.join(__dirname, file);

const data = JSON.parse(fs.readFileSync(filePath, "utf8"));


Card.insertMany(data.cards, (err) => {
    if (err) {
        console.error("Error saving HearthstoneCard objects:", err);
    } else {
        console.log("HearthstoneCard objects saved successfully.");
    }
});
