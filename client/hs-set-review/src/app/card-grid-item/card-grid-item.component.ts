import { Component, Input } from '@angular/core';
import { HearthstoneCard } from '../models/hs-card';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card-grid-item',
  templateUrl: './card-grid-item.component.html',
  styleUrls: ['./card-grid-item.component.scss']
})
export class CardGridItemComponent {
  @Input() card?: HearthstoneCard;

  ratingForm = this.fb.group({
    userRating: [3],
    chatRating: []
  });

  constructor(
    private fb: FormBuilder
  ) {

  }

  changedRate(event: any) {    
  }
}
