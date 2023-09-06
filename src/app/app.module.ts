import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

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
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzSwitchModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
