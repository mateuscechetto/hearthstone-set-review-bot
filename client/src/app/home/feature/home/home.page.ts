import { DecimalPipe, NgClass, NgIf } from '@angular/common';
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
  ],
  standalone: true,
})
export class HomePage {
  title = 'Showdown in the Badlands Card Review';
  bestCards: HotCards[] = [];
  worstCards: HotCards[] = [];
  standardDeviationCards: HotCards[] = [];
  usersWithRating: User[] = [];

  constructor(
    private homeService: HomeService
  ) {}

  ngOnInit() {
    combineLatest([
      this.homeService.getUsers(),
      this.homeService.getStats(),
    ]).subscribe(([users, cards]) => {
      console.log([users, cards]);

      this.usersWithRating = users.sort((a, b) => b.followers - a.followers);
      const { bestCards, worstCards, standardDeviationCards } = cards;
      this.bestCards = bestCards;
      this.worstCards = worstCards;
      this.standardDeviationCards = standardDeviationCards;
    });
  }
}
