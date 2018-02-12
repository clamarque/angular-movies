import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MovieComponent } from './movie.component';
import { routing } from './movie-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [MovieComponent]
})
export class MovieModule { }
