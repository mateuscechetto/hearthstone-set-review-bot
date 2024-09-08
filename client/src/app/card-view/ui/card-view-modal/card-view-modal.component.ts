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
import {
  CompareCardAPIReturn,
  HearthstoneCard,
  HearthstoneClass,
  RatedCard,
} from '@shared/models/hs-card';
import { RecordChatComponent } from '@card-view/ui/record-chat/record-chat.component';
import { ButtonModule } from 'primeng/button';

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
    ButtonModule,
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
  @Input() reviewersToCompare: CompareCardAPIReturn[] = [];
  @Input() hasTourist: boolean = false;
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

  isRecording = false;

  compareRatings: any[] = [];

  twitchIconURL =
    'https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_1280.png';
  hsrIconURL =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvw2ri47mehC08Q5LKf4SamN5ayk7Fzof00j2O2yCbHw&s';

  tourists: Record<HearthstoneClass, HearthstoneClass[] | null> = {
    [HearthstoneClass.ROGUE]: [HearthstoneClass.PALADIN, HearthstoneClass.MAGE],
    [HearthstoneClass.WARLOCK]: [HearthstoneClass.ROGUE],
    [HearthstoneClass.DEATH_KNIGHT]: [HearthstoneClass.WARLOCK],
    [HearthstoneClass.SHAMAN]: [HearthstoneClass.DEATH_KNIGHT],
    [HearthstoneClass.DEMON_HUNTER]: [HearthstoneClass.SHAMAN],
    [HearthstoneClass.PRIEST]: [HearthstoneClass.DEMON_HUNTER],
    [HearthstoneClass.HUNTER]: [
      HearthstoneClass.PRIEST,
      HearthstoneClass.SHAMAN,
    ],
    [HearthstoneClass.WARRIOR]: [HearthstoneClass.HUNTER],
    [HearthstoneClass.DRUID]: [HearthstoneClass.WARRIOR],
    [HearthstoneClass.MAGE]: [HearthstoneClass.DRUID],
    [HearthstoneClass.PALADIN]: [HearthstoneClass.MAGE],
    [HearthstoneClass.NEUTRAL]: null,
  };

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
        chatRating: Math.round(this.card.chatRating ?? 0),
        hsrRating: this.card.hsr_rating,
      });

      this.cardToDisplay = this.card;

      this.compareRatings = [];
      this.reviewersToCompare.forEach((review) => {
        const reviewedCard = review.cards.find(
          (c) => c.card.dbf_id === this.cardToDisplay.dbf_id
        );
        //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
        if (!this.ratingForm.controls[review.user.name]) {
          //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
          this.ratingForm.addControl(
            review.user.name,
            this.fb.control(reviewedCard?.rating ?? 0)
          );
        } else {
          //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
          this.ratingForm.patchValue({
            [review.user.name]: reviewedCard?.rating ?? 0,
          });
        }
        this.compareRatings.push(review.user.name);
      });
    }

    if (changes.reviewersToCompare?.currentValue) {
      this.compareRatings = [];
      this.reviewersToCompare.forEach((review) => {
        //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
        if (!this.ratingForm.controls[review.user.name]) {
          const reviewedCard = review.cards.find(
            (c) => c.card.dbf_id === this.card.dbf_id
          );
          //@ts-ignore added because angular 14 added typing to forms and our form is dynamic.
          this.ratingForm.addControl(
            review.user.name,
            this.fb.control(reviewedCard!.rating)
          );
        }
        this.compareRatings.push(review.user.name);
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
    this.isRecording = true;
    this.recordChat.emit(this.card);
  }

  onStopRecording() {
    this.isRecording = false;
    this.stopRecording.emit(this.card);
  }
}
