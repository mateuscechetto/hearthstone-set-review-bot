import { Component, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';
import { HearthstoneCard, RatedCard } from '../../models/hs-card';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-card-view-modal[card]',
  templateUrl: './card-view-modal.component.html',
  styleUrls: ['./card-view-modal.component.scss']
})
export class CardViewModalComponent implements OnChanges {
  private _shouldShowModal: any;
  get shouldShowModal(): any {
    return this._shouldShowModal;
  }
  @Input()
  set shouldShowModal(value: any) {
    if(this._shouldShowModal === value) {
      return;
    }
    this._shouldShowModal = value;
    this.shouldShowModalChange.emit(this._shouldShowModal);
  }
  @Output() shouldShowModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() card!: RatedCard;
  @Output() changedCard: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedCardRate: EventEmitter<number> = new EventEmitter<number>();
  
  ratingForm = this.fb.group({
    userRating: [0],
    chatRating: [0]
  });

  cardToDisplay: HearthstoneCard = this.card;

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowRight') {
      this.changedCard.emit(1);
    }
    if (event.key == 'ArrowLeft') {
      this.changedCard.emit(-1);
    }
  }

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: any) {
    if (changes.card.currentValue) {
      this.ratingForm.patchValue({
        userRating: this.card.rating,
        chatRating: this.card.chatRating
      });

      this.cardToDisplay = this.card;
    }
  }

  onExtraCardHover(extraCard: HearthstoneCard) {
    this.cardToDisplay = extraCard;
  }

  onExtraCardLeave() {
    this.cardToDisplay = this.card;
  }


  changedRate(event: any) {
    this.changedCardRate.emit(event.value);      
  }

}
