import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) { }

  setUserToken(token: string): void {
    this.cookieService.set('userToken', token, 7); // Expires in 7 days
  }

  getUserToken(): string {
    return this.cookieService.get('userToken');
  }

  clearUserToken(): void {
    this.cookieService.delete('userToken');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('userToken');
  }

  public login(): void {
    window.open(`${environment.apiUrl}/api/auth/twitch`, '_self');
  }

  public logout(): Observable<void> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/logout`, {
      withCredentials: true
    });
  }

  public getUser(): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/login/success`, {
      withCredentials: true
    });
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/user`, {
      withCredentials: true,
      params: {
        username
      }
    });
  }

  public hasUser(username: string): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/hasUser`, {
      withCredentials: true,
      params: {
        username
      }
    });
  }

  public userIsStreamer(username: string, userToken: string = this.getUserToken()): Observable<User> {
    const url = `${environment.apiUrl}/api/auth/users/${username}/isStreamer`;
    return this.http.put<any>(url, null, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
  }

  public userIsNOTStreamer(username: string, userToken: string = this.getUserToken()): Observable<User> {
    const url = `${environment.apiUrl}/api/auth/users/${username}/notStreamer`;
    return this.http.put<any>(url, null, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
  }

}
