import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardViewComponent } from './components/card-view/card-view.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { loginGuard, userGuard } from './guards/user.guard';

const routes: Routes = [
  { path: '', component: CardViewComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'view/:username', component: CardViewComponent, canActivate: [userGuard] },
  { path: ':username', component: CardViewComponent, canActivate: [userGuard, loginGuard] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
