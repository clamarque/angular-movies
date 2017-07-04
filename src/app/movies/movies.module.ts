import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MoviesComponent } from './movies.component';
import { routing } from './movies-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [MoviesComponent]
})
export class MoviesModule { }