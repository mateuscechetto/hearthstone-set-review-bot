import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

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
