import { ReviewSummaryService } from '@app/card-view/data-access/review-summary/review-summary.service';
import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { RatedCard } from '@shared/models/hs-card';
import { RecordChatComponent } from '@card-view/ui/record-chat/record-chat.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AnalyticsService } from '@shared/analytics/analytics.service';

@Component({
  selector: 'app-share-summary-modal',
  templateUrl: './share-summary-modal.component.html',
  styleUrls: ['./share-summary-modal.component.scss'],
  standalone: true,
  imports: [
    DialogModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RecordChatComponent,
    DropdownModule,
    ButtonModule,
  ],
})
export class ShareSummaryModalComponent {
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

  @Input() cards: RatedCard[] = [];
  @Input() username: string = '';

  bestCard?: RatedCard;
  favoriteCard?: RatedCard;
  mostOverratedCard?: RatedCard;
  mostUnderratedCard?: RatedCard;

  generatedImageURL: string = '';

  summaryService = inject(ReviewSummaryService);
  analyticsService = inject(AnalyticsService);

  ngOnInit() {
    this.analyticsService.trackEvent('Opened share modal', 'User opened share image modal', 'OPEN_MODAL');
  }


  generateImage() {
    if (
      !this.favoriteCard ||
      !this.mostUnderratedCard ||
      !this.bestCard ||
      !this.mostOverratedCard
    ) {
      return;
    }

    this.analyticsService.trackEvent('Generated image', 'User clicked button to generate image', 'GENERATE_IMAGE');
    this.summaryService
      .generateImage(this.username, [
        this.favoriteCard.imageURL,
        this.mostUnderratedCard.imageURL,
        this.bestCard.imageURL,
        this.mostOverratedCard.imageURL,
      ])
      .subscribe((blob) => {
        this.generatedImageURL = URL.createObjectURL(blob);
      });
  }
}
