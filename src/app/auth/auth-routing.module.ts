import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: AuthComponent, redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
