import {
  AsyncPipe,
  DecimalPipe,
  KeyValuePipe,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { tap } from 'rxjs';
import { HotCards } from '../../shared/models/hs-card';
import {
  AverageRatingByClass,
  StatsService,
} from '@stats/data-access/stats.service';
import {
  ALL_CARDS_TABLE_MOCK,
  BEST_CLASSES_MOCK,
} from '@stats/feature/stats-data.mock';
import { SkeletonModule } from 'primeng/skeleton';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-Stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  imports: [
    ButtonModule,
    NgIf,
    NgFor,
    DataViewModule,
    AvatarModule,
    RouterLink,
    TableModule,
    NgClass,
    TooltipModule,
    DecimalPipe,
    KeyValuePipe,
    AsyncPipe,
    SkeletonModule,
    NgTemplateOutlet,
    InputTextModule
  ],
  standalone: true,
})
export class StatsPage {
  title = 'Showdown in the Badlands Card Review';
  hotCards: HotCards[] = [];
  filteredHotCards: HotCards[] = [];
  ratingsByClass: AverageRatingByClass[] = [];
  cardsByClass: { [key: string]: HotCards[] } = {};

  loadingCards = this.statsService.loadingCards.pipe(
    tap((loading) => {
      if (loading) {
        this.filteredHotCards = ALL_CARDS_TABLE_MOCK;
      }
    })
  );
  loadingAvgRatingByClass = this.statsService.loadingAvgRatingByClass.pipe(
    tap((loading) => {
      if (loading) {
        this.ratingsByClass = BEST_CLASSES_MOCK;
      }
    })
  );

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.getCards().subscribe({
      next: (cards) => {
        this.hotCards = cards;
        this.filteredHotCards = cards;
        this.setClassesCards(cards);
      },
    });

    this.statsService.getAverageRatingsByClass().subscribe({
      next: (ratingsByClass) => {
        this.ratingsByClass = ratingsByClass;
      },
    });
  }

  filterHotCards(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    if (searchQuery === '') {
      this.filteredHotCards = this.hotCards;
    } else {
      this.filteredHotCards = this.hotCards.filter(card => card.name.toLowerCase().includes(searchQuery));
    }
  }

  setClassesCards(cards: HotCards[]) {
    this.cardsByClass = {};
    cards.forEach((card) => {
      const hsClass = card.hsClass || 'Neutral';
      if (!this.cardsByClass[hsClass]) {
        this.cardsByClass[hsClass] = [];
      }
      this.cardsByClass[hsClass].push(card);
    });
  }
}
