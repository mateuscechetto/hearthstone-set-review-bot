import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';


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

}
