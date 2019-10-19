import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginGuard } from './middlewares/login.guard';
import { AuthGuard } from './middlewares/auth.guard';
import {RedirectUri} from './components/redirectUri/redirect-uri.component';
import {proRedirectUri} from './components/protected-redirectUri/protected-redirectUri';
import {LoginPhoneComponent} from './components/phoneLogin/phone.component';
import {restPasswordComponent} from './components/resetPassword/restPassword.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'phoneLogin',
    component: LoginPhoneComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'resetPassword',
    component: restPasswordComponent,
    canActivate: [LoginGuard]
  },
 
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth/protected',
    component: proRedirectUri,
    canActivate: [AuthGuard]

  },
  {
    path:'auth',
    component:RedirectUri,
    canActivate: [LoginGuard]

  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
