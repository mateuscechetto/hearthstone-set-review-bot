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
import { HotCards } from '@shared/models/hs-card';
import { User } from '@shared/models/user';
import { HomeService } from '@home/data-access/home.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CARDS_MOCK, USERS_MOCK } from '@home/feature/home/home-data.mock';
import { tap } from 'rxjs';
import { ExpansionService } from '@shared/data-access/expansion/expansion.service';

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
  bestCards: HotCards[] = [];
  worstCards: HotCards[] = [];
  standardDeviationCards: HotCards[] = [];
  usersWithRating: User[] = [];
  activeExpansion = this.expansionService.activeExpansion;
  loadingUsers = this.homeService.loadingUsers.pipe(
    tap((loading) => {
      if (loading) {
        this.usersWithRating = USERS_MOCK;
      }
    })
  );
  loadingStats = this.homeService.loadingStats.pipe(
    tap((loading) => {
      if (loading) {
        this.bestCards = CARDS_MOCK;
        this.worstCards = CARDS_MOCK;
        this.standardDeviationCards = CARDS_MOCK;
      }
    })
  );

  constructor(private homeService: HomeService, private expansionService: ExpansionService) {}

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
