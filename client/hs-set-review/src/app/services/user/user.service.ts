import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


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

  public test() {
    return this.http.get(`${environment.apiUrl}/test`);
  }

  public login() {
    window.open(`${environment.apiUrl}/api/auth/twitch`, '_self');
  }

  public getUser() {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/login/success`, {
      withCredentials: true
    });
  }


}
