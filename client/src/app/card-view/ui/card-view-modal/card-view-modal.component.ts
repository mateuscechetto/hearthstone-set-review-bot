import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { CompareCardAPIReturn, HearthstoneCard, RatedCard } from '@shared/models/hs-card';
import { RecordChatComponent } from '@card-view/ui/record-chat/record-chat.component';

@Component({
  selector: 'app-card-view-modal',
  templateUrl: './card-view-modal.component.html',
  styleUrls: ['./card-view-modal.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    RatingModule,
    NgIf,
    RecordChatComponent,
    NgFor,
    TooltipModule,
    DecimalPipe,
  ],
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
  @Output() shouldShowModalChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Input({ required: true }) card!: RatedCard;
  @Input() userImg: string = '';
  @Input() isLoggedUser: boolean = false;
  @Input() isUserStreamer: boolean = false;
  @Input() streamerView: boolean = false;
  @Input() isInPreExpansionSeason: boolean = true;
  @Input() reviewersToCompare: CompareCardAPIReturn[][] = [];
  @Output() changedCard: EventEmitter<number> = new EventEmitter<number>();
  @Output() changedRate: EventEmitter<{ rating: number; card: RatedCard }> =
    new EventEmitter<{ rating: number; card: RatedCard }>();
  @Output() recordChat: EventEmitter<RatedCard> = new EventEmitter<RatedCard>();
  @Output() stopRecording: EventEmitter<RatedCard> =
    new EventEmitter<RatedCard>();

  ratingForm = this.fb.group({
    userRating: [0],
    chatRating: [0],
    hsrRating: [0],
  });

  cardToDisplay: HearthstoneCard = this.card;

  compareRatings: any[] = [];

  twitchIconURL =
    'https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_1280.png';
  hsrIconURL =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvw2ri47mehC08Q5LKf4SamN5ayk7Fzof00j2O2yCbHw&s';

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowRight') {
      this.changedCard.emit(1);
    }
    if (event.key == 'ArrowLeft') {
      this.changedCard.emit(-1);
    }
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: any) {
    if (changes.card.currentValue) {
      this.ratingForm.patchValue({
        userRating: this.card.rating,
        chatRating: Math.round(this.card.chatRating || 0),
        hsrRating: this.card.hsr_rating,
      });

      this.cardToDisplay = this.card;

      this.compareRatings = [];
      this.reviewersToCompare.forEach((review, index) => {
        const reviewedCard = review.find(c => c.card.dbf_id === this.cardToDisplay.dbf_id);
        //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
        if (!this.ratingForm.controls[review[index].user.name]) {
          //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
          this.ratingForm.addControl(review[index].user.name, this.fb.control(reviewedCard?.rating || 0));
        } else {
          //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
          this.ratingForm.patchValue({[review[index].user.name]: reviewedCard?.rating || 0});
        }
        this.compareRatings.push(review[index].user.name);
      });

    }
    
    if (changes.reviewersToCompare?.currentValue) {      
      this.compareRatings = [];
      this.reviewersToCompare.forEach((review, index) => {
        //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
        if (!this.ratingForm.controls[review[index].user.name]) {
          const reviewedCard = review.find(c => c.card.dbf_id === this.card.dbf_id);
          //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
          this.ratingForm.addControl(review[index].user.name, this.fb.control(reviewedCard.rating));
        }
        this.compareRatings.push(review[index].user.name);
      });
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
      card: this.card,
    });
  }

  onRecordChat() {
    this.recordChat.emit(this.card);
  }

  onStopRecording() {
    this.stopRecording.emit(this.card);
  }
}
