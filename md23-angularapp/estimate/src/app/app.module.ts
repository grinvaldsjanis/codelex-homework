import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [AppComponent, ItemListComponent],
  imports: [BrowserModule, CommonModule, FormsModule], // add CommonModule
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
