import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private cookieService: CookieService) { }

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
  
}
