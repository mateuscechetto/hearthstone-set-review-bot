import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { HearthstoneClass, HotCards } from '../../shared/models/hs-card';
import { environment } from '../../../environments/environment';
import { ExpansionService } from '../../shared/data-access/expansion/expansion.service';

export type StatsApiReturn = {
  bestCards: HotCards[];
  worstCards: HotCards[];
  standardDeviationCards: HotCards[];
};

export type AverageRatingByClass = {
  hsClass: HearthstoneClass;
  avgRating: number;
  numRatings: number;
  avg_hsr_rating?: number;
};

export interface StatsLoadingState {
  cards: boolean;
  avgRatingByClass: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  private loadingState: BehaviorSubject<StatsLoadingState> =
    new BehaviorSubject<StatsLoadingState>({
      cards: false,
      avgRatingByClass: false,
    });

  loadingCards = this.loadingState.pipe(map((v) => v.cards));
  loadingAvgRatingByClass = this.loadingState.pipe(
    map((v) => v.avgRatingByClass)
  );

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

  getAverageRatingsByClass() {
    return this.expansionService.activeExpansion.pipe(
      tap(() =>
        this.loadingState.next({
          ...this.loadingState.value,
          avgRatingByClass: true,
        })
      ),
      switchMap((expansion) =>
        this.http.get<AverageRatingByClass[]>(
          `${environment.apiUrl}/api/averageRatingsByClass`,
          {
            withCredentials: true,
            params: {
              expansion,
            },
          }
        )
      ),
      tap(() =>
        this.loadingState.next({
          ...this.loadingState.value,
          avgRatingByClass: false,
        })
      )
    );
  }
}
