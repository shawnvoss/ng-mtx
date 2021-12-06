import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { MtxButtonModule } from '../../../components/button';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, CommonModule, MatButtonModule, MatCommonModule, MatIconModule, MtxButtonModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
