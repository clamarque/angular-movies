import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ResetPasswordComponent } from './reset-password.component';
import { routing } from './reset-password-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }