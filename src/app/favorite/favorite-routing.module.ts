import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoriteComponent } from './favorite.component';

const routes: Routes = [
  { path: '', component: FavoriteComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);