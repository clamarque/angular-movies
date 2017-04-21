import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { DiscoverComponent } from './discover.component';
import { routing } from './discover-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [DiscoverComponent]
})
export class DiscoverModule { }