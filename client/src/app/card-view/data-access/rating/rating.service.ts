import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RatedCardAPIReturn } from '../../../shared/models/hs-card';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  constructor(private http: HttpClient) {}

  public rateCard(
    cardName: string,
    rating: number,
    userToken: string
  ): Observable<RatedCardAPIReturn> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/rateCard`,
      { cardName, rating },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  }

  public recordChat(cardName: string, userToken: string): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/record`,
      { cardName },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  }

  public stopRecording(
    cardName: string,
    userToken: string
  ): Observable<RatedCardAPIReturn> {
    return this.http.post<any>(
      `${environment.apiUrl}/api/stop`,
      { cardName },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
  }
}
