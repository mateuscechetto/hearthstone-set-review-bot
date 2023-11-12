import { DecimalPipe, KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { HotCards } from 'src/app/shared/models/hs-card';
import { User } from 'src/app/shared/models/user';
import { AverageRatingByClass, StatsService } from '../data-access/stats.service';

@Component({
  selector: 'app-Stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  imports: [ButtonModule, NgIf, NgFor, DataViewModule, AvatarModule, RouterLink, TableModule, NgClass, TooltipModule, DecimalPipe, KeyValuePipe],
  standalone: true
})
export class StatsPage {

  title = "Showdown in the Badlands Card Review";
  loggedUser: User | undefined;
  standardDeviationCards: HotCards[] = [];
  hotCards: HotCards[] = [];
  ratingsByClass: AverageRatingByClass[] = [];
  cardsByClass: { [key: string]: HotCards[] } = {};

  constructor(
    private userService: UserService,
    private statsService: StatsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (loggedUser) => {
        this.loggedUser = loggedUser;
        this.userService.setUserToken(loggedUser.userToken);
      },
      error: (e) => this.loggedUser = undefined
    });

    forkJoin([
      this.statsService.getCards(),
      this.statsService.getAverageRatingsByClass(),
    ])
      .subscribe(
        ([hotCards, ratingsByClass]) => {
          this.hotCards = hotCards;
          this.setClassesCards(hotCards);
          this.ratingsByClass = ratingsByClass;
        });
  }

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout().subscribe();
  }

  redirect() {
    this.router.navigate(['/review/molino_hs']);
  }

  setClassesCards(cards: HotCards[]) {
    this.cardsByClass = {};
    cards.forEach(card => {
      const hsClass = card.hsClass || 'Neutral';
      if (!this.cardsByClass[hsClass]) {
        this.cardsByClass[hsClass] = [];
      }
      this.cardsByClass[hsClass].push(card);
    })
  }


}
