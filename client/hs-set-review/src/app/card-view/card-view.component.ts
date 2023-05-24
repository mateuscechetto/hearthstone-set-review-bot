import { Component } from '@angular/core';
import { CardRarity, HearthstonCardType, HearthstoneCard, HearthstoneClass } from '../models/hs-card';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent {
  layout: 'list' | 'grid' = 'grid';
  products: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Accessories',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
  ];

  cards = [
{    name: 'Death Growl',
    description: 'Choose a minion. Spread its Deathrattle to adjacent minions.',
    imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e6ca50aee0e962223bbbf2dfab32c5236e6cb6d4e2728611324fd54cfbb74210.png',
    expansion: 'Festival of Legends',
    mana: 1,
    type: HearthstonCardType.SPELL,
    hsClass: HearthstoneClass.DEATH_KNIGHT,
    rarity: CardRarity.RARE,
  },
  {    name: 'Death Growl',
    description: 'Choose a minion. Spread its Deathrattle to adjacent minions.',
    imageURL: 'https://d15f34w2p8l1cc.cloudfront.net/hearthstone/e6ca50aee0e962223bbbf2dfab32c5236e6cb6d4e2728611324fd54cfbb74210.png',
    expansion: 'Festival of Legends',
    mana: 1,
    type: HearthstonCardType.SPELL,
    hsClass: HearthstoneClass.DEATH_KNIGHT,
    rarity: CardRarity.RARE,
  }
  ] as HearthstoneCard[];

}
