import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { PageNotFoundComponent } from './not-found.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';

const routes: Routes = [
  { path: 'movies', component: MoviesComponent, children: [
    { path: 'list/:category', component: MovieListComponent },
    { path: 'genre', component: MovieListComponent },
    { path: 'movie/:id', component: MovieComponent},
    { path: 'search', component: MovieListComponent}
  ] },
  { path: 'playlist/:category', loadChildren: 'app/playlist/playlist.module#PlaylistModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'sign-in', loadChildren: 'app/sign-in/sign-in.module#SignInModule' },
  { path: 'star/:id', loadChildren: 'app/star/star.module#StarModule' },
  { path: '', redirectTo: '/movies/list/now-playing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
