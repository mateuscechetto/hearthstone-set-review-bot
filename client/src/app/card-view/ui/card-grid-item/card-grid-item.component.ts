import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { RatedCard } from '../../../shared/models/hs-card';
import { RecordChatComponent } from '../record-chat/record-chat.component';
import { EnvironmentService } from '../../../shared/environment/environment.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-card-grid-item[card]',
    templateUrl: './card-grid-item.component.html',
    styleUrls: ['./card-grid-item.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, AvatarModule, RatingModule, NgIf, RecordChatComponent, TooltipModule]
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
    chatRating: [0],
    hsrRating: [0],
  });

  isInPreExpansionSeason = this.environment.isInPreExpansionSeason();

  twitchIconURL = 'https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_1280.png';
  hsrIconURL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvw2ri47mehC08Q5LKf4SamN5ayk7Fzof00j2O2yCbHw&s';

  constructor(
    private fb: FormBuilder,
    private environment: EnvironmentService,
  ) { }

  ngOnChanges(changes: any) {
    if (changes.card?.currentValue) {
      this.ratingForm.patchValue({
        userRating: this.card.rating,
        chatRating: this.card.chatRating,
        hsrRating: this.card.hsr_rating,
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
