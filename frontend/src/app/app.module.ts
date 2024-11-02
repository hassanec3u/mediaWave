import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./account/register/register.component";
import {CookieService} from "ngx-cookie-service";
import {LogoutComponent} from './account/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {HeaderComponent} from './shared/header/header.component';
import {HomeComponent} from './home/home.component';
import {FriendSearchComponent} from './friend/friend-search.component';


@NgModule({
    declarations: [AppComponent, LoginComponent,RegisterComponent,LogoutComponent,FriendSearchComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    , BrowserModule,
    HomeComponent,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatIconModule, HeaderComponent],
    providers: [CookieService,provideAnimationsAsync()],
    bootstrap: [AppComponent]
})
export class AppModule {}
