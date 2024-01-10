import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(
    private http: HttpClient,
    private expansionService: ExpansionService
  ) {}

  getCards(): Observable<HotCards[]> {
    return this.expansionService.activeExpansion.pipe(
      switchMap((expansion) =>
        this.http.get<HotCards[]>(`${environment.apiUrl}/api/hotCards`, {
          withCredentials: true,
          params: {
            expansion,
          },
        })
      )
    );
  }

  getAverageRatingsByClass() {
    return this.expansionService.activeExpansion.pipe(
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
      )
    );
  }
}
