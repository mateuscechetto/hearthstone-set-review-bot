import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UserService } from '../data-access/user/user.service';

export const userGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);
  return service.hasUser(route.params['username']).pipe(
    map(
      hasUser => {
        if (hasUser) {
          return true;
        } else {
          router.navigate(['/not-found']);
          return false;
        }
      }
    )
  )
};

export const loginGuard: CanActivateFn = (route, state) => {
  const service = inject(UserService);
  const router = inject(Router);
  return service.getUser().pipe(
    map(
      user => {
        if (user.name.toLowerCase() == route.params['username'].toLowerCase()) {
          return true;
        } else {
          router.navigate(['/review', route.params['username'], 'view-only']);
          return false;
        }
      }
    ), catchError(() => {
      router.navigate(['/review', route.params['username'], 'view-only']);
      return of(false);
    })
  )
};
