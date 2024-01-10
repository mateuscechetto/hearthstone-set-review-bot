import { Injectable } from '@angular/core';
import { RatedCardAPIReturn } from '../../../shared/models/hs-card';
import { Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ExpansionService } from '../../../shared/data-access/expansion/expansion.service';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(
    private http: HttpClient,
    private expansionService: ExpansionService
  ) {}

  getCards(userName: string): Observable<RatedCardAPIReturn[]> {
    return this.expansionService.activeExpansion.pipe(
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
      )
    );
  }
}
