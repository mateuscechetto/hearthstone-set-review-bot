import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { RatedCard } from '../../models/hs-card';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card-grid-item[card]',
  templateUrl: './card-grid-item.component.html',
  styleUrls: ['./card-grid-item.component.scss']
})
export class CardGridItemComponent implements OnChanges {
  @Input() card!: RatedCard;
  @Input() userImg: string = '';
  @Input() isLoggedUser: boolean = false;
  @Input() isUserStreamer: boolean = false;
  @Input() streamerView: boolean = false;
  @Output() imageClick: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();
  @Output() changedRate: EventEmitter<{ rating: number, card: RatedCard }> = new EventEmitter<{ rating: number, card: RatedCard }>();
  @Output() recordChat: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();
  @Output() stopRecording: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();

  ratingForm = this.fb.group({
    userRating: [0],
    chatRating: [0]
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: any) {
    if (changes.card?.currentValue) {
      this.ratingForm.patchValue({
        userRating: this.card.rating,
        chatRating: this.card.chatRating
      });
    }
  }

  onChangedRate(event: any) {
    this.card.rating = event.value;
    this.changedRate.emit({
      rating: event.value,
      card: this.card
    });
  }

  onImageClicked() {
    this.imageClick.emit(this.card);
  }

  onRecordChat() {
    this.recordChat.emit(this.card);
  }

  onStopRecording() {
    this.stopRecording.emit(this.card);
  }

}
