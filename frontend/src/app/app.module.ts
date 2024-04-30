import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { EventModule } from './event/event.module';


import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [AppComponent],
    imports: [
    BrowserModule,
    AppRoutingModule,
    EventModule,
    FormsModule,
    LoginComponent
],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
