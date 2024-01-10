import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { HotCards } from '../../shared/models/hs-card';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';
import {
  ExpansionService,
} from '../../shared/data-access/expansion/expansion.service';

export type HomeApiReturn = {
  bestCards: HotCards[];
  worstCards: HotCards[];
  standardDeviationCards: HotCards[];
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
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

  getStats(): Observable<HomeApiReturn> {
    return this.expansionService.activeExpansion.pipe(
      switchMap((expansion) =>
        this.http.get<HomeApiReturn>(`${environment.apiUrl}/api/homeStats`, {
          withCredentials: true,
          params: {
            expansion,
          },
        })
      )
    );
  }

  getUsers(): Observable<User[]> {
    return this.expansionService.activeExpansion.pipe(
      switchMap((expansion) =>
        this.http.get<User[]>(`${environment.apiUrl}/api/users`, {
          withCredentials: true,
          params: {
            expansion,
          },
        })
      )
    );
  }
}
