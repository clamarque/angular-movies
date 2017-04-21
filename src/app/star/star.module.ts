import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { StarComponent } from './star.component';
import { routing } from './star-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [StarComponent]
})
export class StarModule { }