import {
  DecimalPipe,
  KeyValuePipe,
  NgClass,
  NgFor,
  NgIf,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { combineLatest } from 'rxjs';
import { HotCards } from '../../shared/models/hs-card';
import {
  AverageRatingByClass,
  StatsService,
} from '../data-access/stats.service';

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
  ],
  standalone: true,
})
export class StatsPage {
  title = 'Showdown in the Badlands Card Review';
  standardDeviationCards: HotCards[] = [];
  hotCards: HotCards[] = [];
  ratingsByClass: AverageRatingByClass[] = [];
  cardsByClass: { [key: string]: HotCards[] } = {};

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    combineLatest([
      this.statsService.getCards(),
      this.statsService.getAverageRatingsByClass(),
    ]).subscribe(([hotCards, ratingsByClass]) => {
      this.hotCards = hotCards;
      this.setClassesCards(hotCards);
      this.ratingsByClass = ratingsByClass;
    });
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
