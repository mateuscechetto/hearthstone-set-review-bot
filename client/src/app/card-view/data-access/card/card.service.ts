import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';
import {
  CompareCardAPIReturn,
  RatedCardAPIReturn,
} from '@shared/models/hs-card';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ExpansionService } from '@shared/data-access/expansion/expansion.service';

export interface CardLoadingState {
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  // state
  private loadingState: BehaviorSubject<CardLoadingState> =
    new BehaviorSubject<CardLoadingState>({
      loading: false,
    });

  // selectors
  loading = this.loadingState.pipe(map((v) => v.loading));

  private cardsCache: { [key: string]: CompareCardAPIReturn[] } = {};

  constructor(
    private http: HttpClient,
    private expansionService: ExpansionService
  ) {}

  getCards(userName: string): Observable<RatedCardAPIReturn[]> {
    return this.expansionService.activeExpansion.pipe(
      tap(() => this.loadingState.next({ loading: true })),
      switchMap((expansion) =>
        this.http.get<RatedCardAPIReturn[]>(
          `${environment.apiUrl}/api/ratedCards`,
          {
            withCredentials: true,
            params: {
              userName,
              expansion,
            },
          }
        )
      ),
      tap(() => this.loadingState.next({ loading: false }))
    );
  }

  getCompareReviewersCards(
    reviewers: string[]
  ): Observable<CompareCardAPIReturn[][]> {
    if (!reviewers || reviewers.length === 0) {
      return of([]);
    }
    const requests = reviewers.map((reviewer) =>
      this.getCompareReviewer(reviewer, true)
    );
    return combineLatest(requests) as Observable<CompareCardAPIReturn[][]>;
  }

  private getCompareReviewer(
    userName: string,
    useCachedValue: boolean = false
  ): Observable<CompareCardAPIReturn[]> {
    if (useCachedValue && this.cardsCache[userName]) {
      return of(this.cardsCache[userName]);
    }

    return this.expansionService.activeExpansion.pipe(
      switchMap((expansion) =>
        this.http.get<CompareCardAPIReturn[]>(
          `${environment.apiUrl}/api/compareRatings`,
          {
            withCredentials: true,
            params: {
              userName,
              expansion,
            },
          }
        )
      ),
      tap((cards) => (this.cardsCache[userName] = cards))
    );
  }
}
