import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HearthstoneClass, HotCards } from 'src/app/shared/models/hs-card';
import { environment } from 'src/environments/environment';

export type StatsApiReturn = {
  bestCards: HotCards[];
  worstCards: HotCards[];
  standardDeviationCards: HotCards[];
}

export type AverageRatingByClass = {
  hsClass: HearthstoneClass;
  avgRating: number;
  numRatings: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getCards(): Observable<HotCards[]> {
    return this.http.get<HotCards[]>(`${environment.apiUrl}/api/hotCards`, {
      withCredentials: true,
    });
  }

  getAverageRatingsByClass() {
    return this.http.get<AverageRatingByClass[]>(`${environment.apiUrl}/api/averageRatingsByClass`, {
      withCredentials: true,
    });
  }

}
