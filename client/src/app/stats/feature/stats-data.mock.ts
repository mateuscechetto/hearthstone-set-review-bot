// Those mocks are used so we know how many skeletons need to be rendered
// hotCards: HotCards[] = [];
// ratingsByClass: AverageRatingByClass[] = [];

import { HearthstoneClass, HotCards } from 'src/app/shared/models/hs-card';
import { AverageRatingByClass } from '../data-access/stats.service';

// cardsByClass: { [key: string]: HotCards[] } = {};
export const BEST_CLASSES_MOCK: AverageRatingByClass[] = [
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
  { avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, numRatings: 1 },
];

export const ALL_CARDS_TABLE_MOCK: HotCards[] = [
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
    {avgRating: 1, hsClass: HearthstoneClass.DEATH_KNIGHT, imageURL: '', name: '', ratings: [], standardDeviation: 0},
]



