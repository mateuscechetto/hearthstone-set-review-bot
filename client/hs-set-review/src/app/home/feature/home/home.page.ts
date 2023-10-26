import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    imports: [ButtonModule, NgIf, DataViewModule, AvatarModule, RouterLink],
    standalone: true
})
export class HomePage {

  title = "Showdown in the Badlands Card Review";
  loggedUser: User | undefined;
  usersWithRating: User[] = [
    {
    name: 'molino_hs',
    image: 'https://static-cdn.jtvnw.net/jtv_user_pictures/f0282b46-1953-440a-ba78-d77b3078eca3-profile_image-300x300.png',
    isStreamer: true,
    userToken: '',
    view_count: 500,
  },
  {
    name: 'FenoHS',
    image: 'https://cdn.pixabay.com/photo/2021/12/10/16/38/twitch-6860918_1280.png',
    isStreamer: true,
    userToken: '',
    view_count: 1000,
  },
];

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
