import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/data-access/user/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true
})
export class HomePage {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  login() {
    this.userService.login();
  }

  redirect() {
    this.router.navigate(['/molino_hs']);
  }
}
