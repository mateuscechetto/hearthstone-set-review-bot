import { Injectable } from '@angular/core';
import { RatedCardAPIReturn } from '../../../shared/models/hs-card';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ExpansionService } from '../../../shared/data-access/expansion/expansion.service';

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
}
