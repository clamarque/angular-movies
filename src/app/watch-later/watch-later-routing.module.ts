import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WatchLaterComponent } from './watch-later.component';

const routes: Routes = [
  { path: '', component: WatchLaterComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);