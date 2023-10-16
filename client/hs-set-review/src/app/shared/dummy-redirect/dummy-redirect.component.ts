import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


/**
 * Dummy component created to redirect to a real component.
 * It is needed because OAuth2 redirects to a page outside 
 * of angular application.
 */
@Component({
  selector: 'app-dummy-redirect',
  templateUrl: './dummy-redirect.component.html',
  styleUrls: ['./dummy-redirect.component.scss']
})
export class DummyRedirectComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.http.get<any>(`${environment.apiUrl}/api/auth/login/success`, {
      withCredentials: true
    }).subscribe((resObject) => {});
  }


  login() {
    window.open(`${environment.apiUrl}/api/auth/twitch`, '_self');
  }

}
