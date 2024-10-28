import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./account/register/register.component";
import {CookieService} from "ngx-cookie-service";
import {LogoutComponent} from './account/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, LoginComponent,RegisterComponent,LogoutComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule,HttpClientModule,ReactiveFormsModule],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule {}
