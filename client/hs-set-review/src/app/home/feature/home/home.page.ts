import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    imports: [ButtonModule, NgIf, ],
    standalone: true
})
export class HomePage {

  title = "Showdown in the Badlands Card Review";
  loggedUser: User | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (loggedUser) => {
        this.loggedUser = loggedUser;        
        this.userService.setUserToken(loggedUser.userToken);
      },
      error: (e) => this.loggedUser = undefined
    });
  }

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout().subscribe();
  }

  redirect() {
    this.router.navigate(['/review/molino_hs']);
  }
}
