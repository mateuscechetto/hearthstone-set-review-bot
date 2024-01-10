import {
  AsyncPipe,
  DecimalPipe,
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
import { combineLatest } from 'rxjs';
import { HotCards } from '../../../shared/models/hs-card';
import { User } from '../../../shared/models/user';
import { HomeService } from '../../data-access/home.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CARDS_MOCK, USERS_MOCK } from './home-data.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    ButtonModule,
    NgIf,
    DataViewModule,
    AvatarModule,
    RouterLink,
    TableModule,
    NgClass,
    TooltipModule,
    DecimalPipe,
    AsyncPipe,
    SkeletonModule,
    NgTemplateOutlet,
    NgFor,
  ],
  standalone: true,
})
export class HomePage {
  title = 'Showdown in the Badlands Card Review';
  bestCards: HotCards[] = CARDS_MOCK;
  worstCards: HotCards[] = CARDS_MOCK;
  standardDeviationCards: HotCards[] = CARDS_MOCK;
  usersWithRating: User[] = USERS_MOCK;
  loadingUsers = this.homeService.loadingUsers;
  loadingStats = this.homeService.loadingStats;

  // skeletonTableItems = [1, 2, 3, 3, 4];

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getUsers().subscribe({
      next: (users) => {
        this.usersWithRating = users.sort((a, b) => b.followers - a.followers);
      },
    });

    this.homeService.getStats().subscribe({
      next: (cards) => {
        const { bestCards, worstCards, standardDeviationCards } = cards;
        this.bestCards = bestCards;
        this.worstCards = worstCards;
        this.standardDeviationCards = standardDeviationCards;
      },
    });
  }
}
