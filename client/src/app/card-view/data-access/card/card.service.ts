import { Injectable } from '@angular/core';
import { RatedCardAPIReturn } from '../../../shared/models/hs-card';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards(userName: string): Observable<RatedCardAPIReturn[]> {
    return this.http.get<any>(`${environment.apiUrl}/api/ratedCards`, {
      withCredentials: true,
      params: {
        userName
      }
    });
  }
}
