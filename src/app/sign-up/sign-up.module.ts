import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { routing } from './sign-up-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }