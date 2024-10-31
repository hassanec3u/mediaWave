import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import {AppComponent} from './app.component';
import {RegisterComponent} from "./account/register/register.component";
import {LogoutComponent} from './account/logout/logout.component';
import {UserProfileComponent} from "./user-profile/page-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:username', component: UserProfileComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
