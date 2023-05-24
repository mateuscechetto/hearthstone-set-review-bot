import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';

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



@NgModule({
  declarations: [
    AppComponent,
    CardViewComponent,
    CardListItemComponent,
    CardGridItemComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    DataViewModule,
    CardModule,
    RatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
