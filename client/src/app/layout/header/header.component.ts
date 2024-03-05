import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { UserService } from '@shared/data-access/user/user.service';
import { User } from '@shared/models/user';
import {
  EXPANSIONS,
  ExpansionService,
} from '@shared/data-access/expansion/expansion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIf,
    RouterLink,
    AutoCompleteModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  router = inject(Router);
  expansionService = inject(ExpansionService);
  userService = inject(UserService);

  expansions = EXPANSIONS;
  selectedExpansion = this.expansionService.activeExpansion;

  loggedUser = this.userService.loggedUser;

  userSearchValue: any;
  options = this.userService.users.pipe();
  suggestions: string[] = [];

  searchUser(event: AutoCompleteCompleteEvent, users: User[]) {
    this.suggestions = users
      .filter((user) =>
        user.name.toLowerCase().includes(event.query.toLowerCase())
      )
      .map((u) => u.name);
  }

  selectUser(streamer: string) {
    this.router.navigate(['review', streamer], { queryParamsHandling: 'merge' });
  }

  changeExpansion(event: DropdownChangeEvent) {
    this.expansionService.setActiveExpansion(event.value);
  }

  login() {
    this.userService.login();
  }

  logout() {
    this.userService.logout();
  }
}
