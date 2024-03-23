export enum HearthstonCardType {
  MINION = 'Minion',
  SPELL = 'Spell',
  WEAPON = 'Weapon',
  HERO = 'Hero',
  LOCATION = 'Location',
  QUEST = 'Quest',
}

export enum HearthstoneClass {
  DEATH_KNIGHT = 'Death Knight',
  DEMON_HUNTER = 'Demon Hunter',
  DRUID = 'Druid',
  HUNTER = 'Hunter',
  MAGE = 'Mage',
  PALADIN = 'Paladin',
  PRIEST = 'Priest',
  ROGUE = 'Rogue',
  SHAMAN = 'Shaman',
  WARLOCK = 'Warlock',
  WARRIOR = 'Warrior',
  NEUTRAL = 'Neutral',
}

export enum CardRarity {
  EXTRA = 'Extra',
  BASIC = 'Basic',
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary',
}

export interface HearthstoneCard {
  name: string;
  description: string;
  imageURL: string;
  expansion: string;
  mana: number;
  type: HearthstonCardType;
  hsClass: HearthstoneClass;
  rarity: CardRarity;
  atk?: number;
  health?: number;
  extraCards?: HearthstoneCard[];
  hsr_rating?: number;
  dbf_id?: number;
}

export interface RatedCard extends HearthstoneCard {
  rating: number;
  chatRating?: number;
}

export interface RatedCardAPIReturn {
  card: HearthstoneCard;
  rating: number;
  chatRating?: number;
}

export interface CompareCardAPIReturn {
  user: {
    name: string;
    image: string;
  };
  cards: RatedCardAPIReturn[];
}

export interface HotCards {
  name: string;
  description: string;
  hsClass: HearthstoneClass;
  imageURL: string;
  avgRating: number;
  standardDeviation: number;
  ratings: number[];
  hsr_rating?: number;
}
