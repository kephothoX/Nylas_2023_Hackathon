import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';


const routes = [
  { path: '', component: AuthComponent },
  { path: 'signin',  component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-password',  component: PasswordResetComponent },
  { path: 'update-profile', title: 'Update profile', component: UpdateProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
