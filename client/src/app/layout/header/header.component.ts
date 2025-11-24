import { map, tap } from 'rxjs';
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
import { AnalyticsService } from '@shared/analytics/analytics.service';
import { Theme, ThemeService } from '../themes/themes.service';

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
  analyticsService = inject(AnalyticsService);
  themeService = inject(ThemeService);

  expansions = EXPANSIONS;
  selectedExpansion = this.expansionService.activeExpansion;

  loggedUser = this.userService.loggedUser;

  options = this.userService.users.pipe();
  suggestions: string[] = [];

  themeOptions: Theme[] = ['Dark', 'Light'];
  theme = this.themeService.activeTheme;

  logoSrc = this.theme.pipe(
    map((t) =>
      t == 'Dark'
        ? '../../../assets/images/logo-dark.png'
        : '../../../assets/images/logo.png'
    )
  );

  ngOnInit() {
    this.analyticsService.trackEvent(
      'User entered',
      'Header component loaded to the view',
      'USER_ENTER'
    );
    this.themeService.initTheme();
  }

  searchUser(event: AutoCompleteCompleteEvent, users: User[]) {
    this.suggestions = users
      .filter((user) =>
        user.name.toLowerCase().includes(event.query.toLowerCase())
      )
      .map((u) => u.name);
  }

  selectUser(streamer: string) {
    this.router.navigate(['review', streamer], {
      queryParamsHandling: 'merge',
    });
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

  toggleTheme(event: DropdownChangeEvent) {
    var isDark = event.value == 'Dark';
    this.themeService.setTheme(isDark ? 'arya-blue' : 'lara-light-blue');
  }
}
