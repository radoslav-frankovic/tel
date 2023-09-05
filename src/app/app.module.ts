import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { KalendarComponent } from './components/kalendar/kalendar.component';
import { ZapasComponent } from './components/zapas/zapas.component';

@NgModule({
  declarations: [
    AppComponent,
    KalendarComponent,
    ZapasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
