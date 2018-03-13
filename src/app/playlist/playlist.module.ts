import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { PlaylistComponent } from './playlist.component';
import { routing } from './playlist-routing.module';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  imports: [
    SharedModule,
    routing,
    MatTabsModule
  ],
  declarations: [PlaylistComponent]
})
export class PlaylistModule { }
