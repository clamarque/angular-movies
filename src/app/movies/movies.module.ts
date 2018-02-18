import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MovieComponent } from '../movie/movie.component';
import { routing } from './movies-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [MovieComponent]
})
export class MoviesModule { }
