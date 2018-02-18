import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from '../movie/movie.component';

const routes: Routes = [
  { path: '', component: MovieComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
