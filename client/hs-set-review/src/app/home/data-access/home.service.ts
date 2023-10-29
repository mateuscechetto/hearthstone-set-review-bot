import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotCards } from 'src/app/shared/models/hs-card';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

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

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`, {
      withCredentials: true,
    });
  }

}
