

import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { TooltipModule } from 'primeng/tooltip';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { RatingService } from './app/card-view/data-access/rating/rating.service';
import { UserService } from './app/shared/data-access/user/user.service';
import { CardService } from './app/card-view/data-access/card/card.service';
import { provideRouter } from '@angular/router';
import { HomePage } from './app/home/feature/home/home.page';
import { NotFoundPage } from './app/not-found/feature/not-found/not-found.page';
import { CardViewPage } from './app/card-view/feature/card-view/card-view.page';
import { loginGuard, userGuard } from './app/shared/guards/user.guard';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
        // angular imports
        BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, 
        // primeng imports
        AvatarModule, ButtonModule, CardModule, DataViewModule, DialogModule, RatingModule, TooltipModule),
        CardService, UserService, RatingService,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter([
          { path: 'home', component: HomePage },
          { path: 'not-found', component: NotFoundPage },
          { path: 'view/:username', component: CardViewPage, canActivate: [userGuard] },
          { path: ':username', component: CardViewPage, canActivate: [userGuard, loginGuard] },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full',
          },         
        ])
    ]
})
  .catch(err => console.error(err));
