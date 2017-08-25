import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { HistoryComponent } from './history.component';
import { routing } from './history-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [HistoryComponent]
})
export class HistoryModule { }