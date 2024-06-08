import {
  AsyncPipe,
  DecimalPipe,
  NgClass,
  NgFor,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { User } from '@shared/models/user';
import { HomeApiReturn, HomeService } from '@home/data-access/home.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CARDS_MOCK, USERS_MOCK } from '@home/feature/home/home-data.mock';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  shareReplay,
  startWith,
} from 'rxjs';
import { ExpansionService } from '@shared/data-access/expansion/expansion.service';
import { UserService } from '@app/shared/data-access/user/user.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  expansionService = inject(ExpansionService);
  homeService = inject(HomeService);
  userService = inject(UserService);

  activeExpansion$ = this.expansionService.activeExpansion;
  searchQuery$ = new BehaviorSubject<string>('');

  loadingStats$ = this.homeService.loadingStats;
  statsContext$: Observable<{ loadingStats: boolean; stats: HomeApiReturn }> =
    combineLatest([
      this.homeService.getStats().pipe(
        startWith<HomeApiReturn>({
          bestCards: CARDS_MOCK,
          worstCards: CARDS_MOCK,
          standardDeviationCards: CARDS_MOCK,
        })
      ),
      this.loadingStats$.pipe(startWith(true)),
    ]).pipe(
      map(([cards, loading]) => {
        if (loading) {
          return {
            stats: {
              bestCards: CARDS_MOCK,
              worstCards: CARDS_MOCK,
              standardDeviationCards: CARDS_MOCK,
            },
            loadingStats: loading,
          };
        }
        return { stats: cards, loadingStats: loading };
      })
    );

  loadingUsers$ = this.userService.loading;
  usersWithRating$: Observable<User[]> = this.userService.users.pipe(
    map((users) => users.sort(this.sortUsers)),
    shareReplay(1)
  );
  filteredUsersWithRating$: Observable<User[]> = combineLatest([
    this.usersWithRating$.pipe(startWith<User[]>([])),
    this.searchQuery$.pipe(startWith('')),
    this.loadingUsers$.pipe(startWith(true)),
  ]).pipe(
    map(([users, query, loading]) => {
      if (loading) {
        return USERS_MOCK;
      }
      if (query === '') {
        return users;
      }
      return (
        users.filter((user) => user.name.toLowerCase().includes(query)) ?? []
      );
    })
  );

  filterUsers(event: Event) {
    const searchQuery = (event.target as HTMLInputElement).value.toLowerCase();
    this.searchQuery$.next(searchQuery);
  }

  private sortUsers(a: User, b: User): number {
    if (!a.image) {
      return 1;
    }
    if (!b.image) {
      return -1;
    }
    return b.followers - a.followers;
  }
}
