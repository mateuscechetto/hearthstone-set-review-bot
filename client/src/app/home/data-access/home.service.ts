import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotCards } from '../../shared/models/hs-card';
import { User } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

export type HomeApiReturn = {
  bestCards: HotCards[];
  worstCards: HotCards[];
  standardDeviationCards: HotCards[];
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getCards(): Observable<HotCards[]> {
    return this.http.get<HotCards[]>(`${environment.apiUrl}/api/hotCards`, {
      withCredentials: true,
    });
  }

  getStats(): Observable<HomeApiReturn> {
    return this.http.get<HomeApiReturn>(`${environment.apiUrl}/api/homeStats`, {
      withCredentials: true,
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`, {
      withCredentials: true,
    });
  }

}
