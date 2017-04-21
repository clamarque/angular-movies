import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscoverComponent } from './discover.component';

const routes: Routes = [
  { path: '', component: DiscoverComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);