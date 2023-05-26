import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardViewComponent } from './card-view/card-view.component';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { CardListItemComponent } from './card-list-item/card-list-item.component';
import { CardGridItemComponent } from './card-grid-item/card-grid-item.component';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CardViewModalComponent } from './card-view-modal/card-view-modal.component';
import { CardService } from './services/card.service';



@NgModule({
  declarations: [
    AppComponent,
    CardViewComponent,
    CardListItemComponent,
    CardGridItemComponent,
    CardViewModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    DataViewModule,
    CardModule,
    RatingModule,
    DialogModule,
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
