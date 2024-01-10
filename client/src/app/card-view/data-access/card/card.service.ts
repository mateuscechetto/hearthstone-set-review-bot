import { Injectable } from '@angular/core';
import { RatedCardAPIReturn } from '../../../shared/models/hs-card';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CURRENT_EXPANSION } from '../../../shared/environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards(userName: string, expansion: string = CURRENT_EXPANSION): Observable<RatedCardAPIReturn[]> {
    return this.http.get<RatedCardAPIReturn[]>(`${environment.apiUrl}/api/ratedCards`, {
      withCredentials: true,
      params: {
        userName,
        expansion
      }
    });
  }
}
