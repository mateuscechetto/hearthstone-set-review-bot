import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { HotCards } from 'src/app/shared/models/hs-card';
import { User } from 'src/app/shared/models/user';
import { HomeService } from '../../data-access/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [ButtonModule, NgIf, DataViewModule, AvatarModule, RouterLink, TableModule],
  standalone: true
})
export class HomePage {

  title = "Showdown in the Badlands Card Review";
  loggedUser: User | undefined;
  hotCards: HotCards[] = [];
  usersWithRating: User[] = [];

  constructor(
    private userService: UserService,
    private homeService: HomeService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: (loggedUser) => {
        this.loggedUser = loggedUser;
        this.userService.setUserToken(loggedUser.userToken);
      },
      error: (e) => this.loggedUser = undefined
    });

    forkJoin([
      this.homeService.getUsers(),
      this.homeService.getCards(),
    ])
      .subscribe(
        ([users, cards]) => {
        this.usersWithRating = users;        
        this.hotCards = cards;
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
