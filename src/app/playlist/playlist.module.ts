import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PlaylistComponent } from './playlist.component';
import { routing } from './playlist-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material';
import { ShareModalComponent } from '../shared/share-modal/share-modal.component';

@NgModule({
  imports: [
    SharedModule,
    routing,
  ],
  declarations: [
    PlaylistComponent,
    ShareModalComponent
  ],
  entryComponents: [
    ShareModalComponent
],
})
export class PlaylistModule { }
