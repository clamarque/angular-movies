import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/index';
import { PageNotFoundComponent } from './not-found.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: 'movie/:id', loadChildren: 'app/movie/movie.module#MovieModule' },
  { path: 'genre', component: MoviesComponent },
  { path: 'movies/:category', component: MoviesComponent },
  { path: 'search', component: MoviesComponent },
  { path: 'history', loadChildren: 'app/history/history.module#HistoryModule', canActivate: [AuthGuard] },
  { path: 'playlist/:category', loadChildren: 'app/playlist/playlist.module#PlaylistModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'sign-in', loadChildren: 'app/sign-in/sign-in.module#SignInModule' },
  { path: 'star/:id', loadChildren: 'app/star/star.module#StarModule' },
  { path: '', redirectTo: '/movies/now-playing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
