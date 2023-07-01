import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CardGridItemComponent } from './components/card-grid-item/card-grid-item.component';
import { CardListItemComponent } from './components/card-list-item/card-list-item.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { CardViewModalComponent } from './components/card-view-modal/card-view-modal.component';
import { RecordChatComponent } from './components/record-chat/record-chat.component';
import { CardService } from './services/card/card.service';
import { UserService } from './services/user/user.service';




@NgModule({
  declarations: [
    AppComponent,
    CardViewComponent,
    CardListItemComponent,
    CardGridItemComponent,
    CardViewModalComponent,
    RecordChatComponent,
  ],
  imports: [
    // angular imports
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
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
  providers: [CardService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
