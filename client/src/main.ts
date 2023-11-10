import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { NotFoundPage } from './app/not-found/feature/not-found/not-found.page';
import { DummyRedirectComponent } from './app/shared/dummy-redirect/dummy-redirect.component';
import { redirectGuard } from './app/shared/guards/user.guard';



bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
      {
        path: 'home',
        loadChildren: () =>
          import('./app/home/feature/home/home.routes')
            .then(r => r.HOME_ROUTES)
      },
      {
        path: 'review',
        loadChildren: () =>
          import('./app/card-view/feature/card-view/card-view.routes')
            .then(r => r.CARD_VIEW_ROUTES)
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('./app/stats/feature/stats.routes')
            .then(r => r.STATS_ROUTES)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'dummy', component: DummyRedirectComponent, canActivate: [redirectGuard] },
      { path: 'not-found', component: NotFoundPage },
      { path: '**', component: NotFoundPage }
    ])
  ]
})
  .catch(err => console.error(err));
