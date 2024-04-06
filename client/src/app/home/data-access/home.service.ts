import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { HotCards } from '@shared/models/hs-card';
import { User } from '@shared/models/user';
import { environment } from '@environment/environment';
import { ExpansionService } from '@shared/data-access/expansion/expansion.service';

export type HomeApiReturn = {
  bestCards: HotCards[];
  worstCards: HotCards[];
  standardDeviationCards: HotCards[];
};

export interface HomeLoadingState {
  users: boolean;
  stats: boolean;
  cards: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private loadingState: BehaviorSubject<HomeLoadingState> =
    new BehaviorSubject<HomeLoadingState>({
      users: false,
      stats: false,
      cards: false,
    });

  loadingUsers = this.loadingState.pipe(map((v) => v.users));
  loadingStats = this.loadingState.pipe(map((v) => v.stats));
  loadingCards = this.loadingState.pipe(map((v) => v.cards));

  constructor(
    private http: HttpClient,
    private expansionService: ExpansionService
  ) {}

  getCards(): Observable<HotCards[]> {
    return this.expansionService.activeExpansion.pipe(
      tap(() =>
        this.loadingState.next({ ...this.loadingState.value, cards: true })
      ),
      switchMap((expansion) =>
        this.http.get<HotCards[]>(`${environment.apiUrl}/api/hotCards`, {
          withCredentials: true,
          params: {
            expansion,
          },
        })
      ),
      tap(() =>
        this.loadingState.next({ ...this.loadingState.value, cards: false })
      )
    );
  }

  getStats(): Observable<HomeApiReturn> {
    return this.expansionService.activeExpansion.pipe(
      tap(() =>
        this.loadingState.next({ ...this.loadingState.value, stats: true })
      ),
      switchMap((expansion) =>
        this.http.get<HomeApiReturn>(`${environment.apiUrl}/api/homeStats`, {
          withCredentials: true,
          params: {
            expansion,
          },
        })
      ),
      tap(() =>
        this.loadingState.next({ ...this.loadingState.value, stats: false })
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.expansionService.activeExpansion.pipe(
      tap(() =>
        this.loadingState.next({ ...this.loadingState.value, users: true })
      ),
      switchMap((expansion) =>
        this.http.get<User[]>(`${environment.apiUrl}/api/users`, {
          withCredentials: true,
          params: {
            expansion,
          },
        })
      ),
      tap(() =>
        this.loadingState.next({ ...this.loadingState.value, users: false })
      )
    );
  }
}
