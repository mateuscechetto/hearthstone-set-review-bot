import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { HearthstoneCard, RatedCard } from '../../../shared/models/hs-card';
import { RecordChatComponent } from '../record-chat/record-chat.component';
import { EnvironmentService } from '../../../shared/environment/environment.service';

@Component({
    selector: 'app-card-view-modal',
    templateUrl: './card-view-modal.component.html',
    styleUrls: ['./card-view-modal.component.scss'],
    standalone: true,
    imports: [DialogModule, SharedModule, FormsModule, ReactiveFormsModule, AvatarModule, RatingModule, NgIf, RecordChatComponent, NgFor, TooltipModule]
})
export class CardViewModalComponent implements OnChanges {
  private _shouldShowModal: any;
  get shouldShowModal(): any {
    return this._shouldShowModal;
  }
  @Input()
  set shouldShowModal(value: any) {
    if (this._shouldShowModal === value) {
      return;
    }
    this._shouldShowModal = value;
    this.shouldShowModalChange.emit(this._shouldShowModal);
  }
  @Output() shouldShowModalChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input({required: true}) card!: RatedCard;
  @Input() userImg: string = '';
  @Input() isLoggedUser: boolean = false;
  @Input() isUserStreamer: boolean = false;
  @Input() streamerView: boolean = false;
  @Output() changedCard: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedRate: EventEmitter<{ rating: number, card: RatedCard }> = new EventEmitter<{ rating: number, card: RatedCard }>();
  @Output() recordChat: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();
  @Output() stopRecording: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();

  ratingForm = this.fb.group({
    userRating: [0],
    chatRating: [0]
  });

  cardToDisplay: HearthstoneCard = this.card;

  isInPreExpansionSeason = this.environment.isInPreExpansionSeason();

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
    private fb: FormBuilder,
    private environment: EnvironmentService,
  ) { }

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


  onChangedRate(event: any) {
    this.card.rating = event.value;
    this.changedRate.emit({
      rating: event.value,
      card: this.card
    });
  }

  onRecordChat() {
    this.recordChat.emit(this.card);
  }

  onStopRecording() {
    this.stopRecording.emit(this.card);
  }

}
