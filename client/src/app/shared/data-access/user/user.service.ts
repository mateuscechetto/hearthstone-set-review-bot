import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { User } from '@shared/models/user';
import { environment } from '@environment/environment';
import {
  ExpansionService,
} from '../expansion/expansion.service';

export interface UsersState {
  users: User[];
  loaded: boolean;
  error: string | null;
  loggedUser: User | null;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // state
  private state: BehaviorSubject<UsersState> = new BehaviorSubject<UsersState>({
    users: [],
    loaded: false,
    error: null,
    loggedUser: null,
  });

  // selectors
  users = this.state.pipe(map((v) => v.users));
  loaded = this.state.pipe(map((v) => v.loaded));
  error = this.state.pipe(map((v) => v.error));
  loggedUser = this.state.pipe(map((v) => v.loggedUser));

  // sources
  private usersLoaded$ = this.getUsers();
  getUser$ = this.getUser();

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private expansionService: ExpansionService
  ) {
    // reducers
    this.usersLoaded$.subscribe({
      next: (users) => {
        this.state.next({
          ...this.state.value,
          users,
          loaded: true,
        });
      },
      error: (err) => this.state.next({ ...this.state.value, error: err }),
    });

    this.getUser$.subscribe({
      next: (user) => {
        this.setUserToken(user.userToken);
        this.state.next({
          ...this.state.value,
          loggedUser: user,
        });
      },
      error: (err) =>
        this.state.next({ ...this.state.value, error: err, loggedUser: null }),
    });
  }

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

  public logout(): void {
    this.http
      .get<any>(`${environment.apiUrl}/api/auth/logout`, {
        withCredentials: true,
      })
      .subscribe({
        next: (_) => {
          this.state.next({
            ...this.state.value,
            loggedUser: null,
          });
        },
        error: (err) =>
          this.state.next({
            ...this.state.value,
            error: err,
            loggedUser: null,
          }),
      });
  }

  public getUser(): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/login/success`, {
      withCredentials: true,
    });
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/user`, {
      withCredentials: true,
      params: {
        username,
      },
    });
  }

  public hasUser(username: string): Observable<boolean> {
    return this.http.get<any>(`${environment.apiUrl}/api/auth/hasUser`, {
      withCredentials: true,
      params: {
        username,
      },
    });
  }

  public userIsStreamer(
    username: string,
    userToken: string = this.getUserToken()
  ): Observable<User> {
    const url = `${environment.apiUrl}/api/auth/users/${username}/isStreamer`;
    return this.http.put<any>(url, null, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }

  public userIsNOTStreamer(
    username: string,
    userToken: string = this.getUserToken()
  ): Observable<User> {
    const url = `${environment.apiUrl}/api/auth/users/${username}/notStreamer`;
    return this.http.put<any>(url, null, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }

  public getUsers(): Observable<User[]> {
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
