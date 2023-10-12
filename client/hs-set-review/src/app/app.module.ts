import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardGridItemComponent } from './card-view/ui/card-grid-item/card-grid-item.component';
import { CardListItemComponent } from './card-view/ui/card-list-item/card-list-item.component';
import { CardViewPage } from './card-view/feature/card-view/card-view.page';
import { CardViewModalComponent } from './card-view/ui/card-view-modal/card-view-modal.component';
import { RecordChatComponent } from './card-view/ui/record-chat/record-chat.component';
import { CardService } from './card-view/data-access/card/card.service';
import { UserService } from './shared/data-access/user/user.service';
import {  NotFoundPage } from './not-found/feature/not-found/not-found.page';
import { RatingService } from './card-view/data-access/rating/rating.service';
import { HomePage } from './home/feature/home/home.page';




@NgModule({
  declarations: [
    AppComponent,
    CardViewPage,
    CardListItemComponent,
    CardGridItemComponent,
    CardViewModalComponent,
    RecordChatComponent,
    NotFoundPage,
    HomePage,
  ],
  imports: [
    // angular imports
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // primeng imports
    AvatarModule,
    ButtonModule,
    CardModule,
    DataViewModule,
    DialogModule,
    RatingModule,
    TooltipModule,

    AppRoutingModule,
  ],
  providers: [CardService, UserService, RatingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
