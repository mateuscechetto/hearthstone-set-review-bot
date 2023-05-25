import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RatedCard } from '../models/hs-card';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card-grid-item',
  templateUrl: './card-grid-item.component.html',
  styleUrls: ['./card-grid-item.component.scss']
})
export class CardGridItemComponent implements OnChanges {
  @Input() card?: RatedCard;
  @Output() imageClick: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();

  ratingForm = this.fb.group({
    userRating: [0],
    chatRating: [0]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: any) {
    if (changes.card?.currentValue) {
      this.ratingForm.patchValue({
        userRating: this.card?.rating,
        chatRating: this.card?.chatRating
      });
    }
  }

  changedRate(event: any) {    
  }

  onImageClicked() {
    this.imageClick.emit(this.card);
  }
}
