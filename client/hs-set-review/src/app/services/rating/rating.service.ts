import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(
    private http: HttpClient
  ) { }

  public rateCard(cardName: string, rating: number, userToken: string): Observable<any> {    
    return this.http.post<any>(`${environment.apiUrl}/api/rateCard`, { cardName, rating }, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
  }

}
