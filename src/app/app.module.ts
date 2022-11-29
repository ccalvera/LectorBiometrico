import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FingerReadComponent } from './finger-read/finger-read.component';

import './finger-read/modules/WebSdk';

@NgModule({
  declarations: [AppComponent, FingerReadComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
