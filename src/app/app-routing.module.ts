import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularDetailsComponent } from './angular-details/angular-details.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'angularDetails', component: AngularDetailsComponent},
  //{path: '/', component: AppComponent},
  {path: 'home', redirectTo: '/', pathMatch: 'full'},//resulting in twice properties
  {path: 'headerCheck', component: HeaderComponent},
  {path : 'login', component : LoginComponent},
  {path : 'signup', component : SignupComponent},
  {path : 'profile/:adminId', component : ProfileComponent},
  {
    path : 'homely',
    component : HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
