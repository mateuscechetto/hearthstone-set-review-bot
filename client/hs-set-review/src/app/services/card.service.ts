import { Injectable } from '@angular/core';
import { RatedCard } from '../models/hs-card';
import { cardsMock } from '../mockData/cards.mock';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }

  getCards(): RatedCard[] {
    return cardsMock;
  }
}
