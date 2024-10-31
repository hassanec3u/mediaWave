import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import {RegisterComponent} from "./account/register/register.component";
import {LogoutComponent} from './account/logout/logout.component';
import {UserProfileComponent} from "./user-profile/page-profile/user-profile.component";
import {AuthGuard} from './guard/auth.guard';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserProfileComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
