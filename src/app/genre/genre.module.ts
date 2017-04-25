import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { GenreComponent } from './genre.component';
import { routing } from './genre-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [GenreComponent]
})
export class GenreModule { }