import { CardRarity, HearthstonCardType, HearthstoneClass, RatedCard } from "../models/hs-card";

export const cardsMock: RatedCard[] = [
    {    name: 'Death Growl',
      description: 'Choose a minion. Spread its Deathrattle to adjacent minions.',
      imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e6ca50aee0e962223bbbf2dfab32c5236e6cb6d4e2728611324fd54cfbb74210.png',
      expansion: 'Festival of Legends',
      mana: 1,
      type: HearthstonCardType.SPELL,
      hsClass: HearthstoneClass.DEATH_KNIGHT,
      rarity: CardRarity.RARE,
      rating: 4,
      chatRating: 1
    },
    {    
      name: 'Body Bagger',
      description: 'Battlecry: Gain a Corpse',
      imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/6b405b3bc1af5952dc99acc5d4051437f3853cafc574fcafeb4c0c65e2d840e8.png',
      expansion: 'Core',
      mana: 1,
      type: HearthstonCardType.MINION,
      hsClass: HearthstoneClass.DEATH_KNIGHT,
      rarity: CardRarity.COMMON,
      atk: 1,
      health: 3,
      rating: 2,
      chatRating: 3.5
    },
]; 