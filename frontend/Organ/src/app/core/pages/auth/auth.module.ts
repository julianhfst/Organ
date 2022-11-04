import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ComponentsModule } from 'components';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ProfilePageComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ComponentsModule,
  ],
})
export class AuthModule {}
