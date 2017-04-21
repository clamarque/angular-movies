import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { FavoriteComponent } from './favorite.component';
import { routing } from './favorite-routing.module';

@NgModule({
  imports: [
    SharedModule, routing
  ],
  declarations: [FavoriteComponent]
})
export class FavoriteModule { }