import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardViewPage } from './card-view/feature/card-view/card-view.page';
import { NotFoundPage } from './not-found/feature/not-found/not-found.page';
import { loginGuard, userGuard } from './shared/guards/user.guard';
import { HomePage } from './home/feature/home/home.page';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'not-found', component: NotFoundPage },
  { path: 'view/:username', component: CardViewPage, canActivate: [userGuard] },
  { path: ':username', component: CardViewPage, canActivate: [userGuard, loginGuard] },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
