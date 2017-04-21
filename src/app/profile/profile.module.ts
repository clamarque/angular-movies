import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { routing } from './profile-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }