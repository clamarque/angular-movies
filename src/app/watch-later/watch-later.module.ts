import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { WatchLaterComponent } from './watch-later.component';
import { routing } from './watch-later-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [WatchLaterComponent]
})
export class WatchLaterModule { }