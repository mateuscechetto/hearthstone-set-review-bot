import { Routes } from '@angular/router';
import { AboutRatingsPage } from './ratings/feature/about-ratings.page';

export const ABOUT_ROUTES: Routes = [
  {
    path: 'ratings',
    component: AboutRatingsPage,
  },
  {
    path: '',
    redirectTo: 'ratings',
    pathMatch: 'full'
  }
];
