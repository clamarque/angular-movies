import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenreComponent } from './genre.component';

const routes: Routes = [
  { path: '', component: GenreComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);