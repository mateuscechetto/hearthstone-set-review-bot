import { AppComponent } from './app/app.component';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { NotFoundPage } from './app/not-found/feature/not-found/not-found.page';



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
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'not-found', component: NotFoundPage },
      { path: '**', component: NotFoundPage }
    ])
  ]
})
  .catch(err => console.error(err));
