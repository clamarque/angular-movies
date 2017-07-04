import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/index';
import { PageNotFoundComponent } from './not-found.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'movie/:id', loadChildren: 'app/movie/movie.module#MovieModule' },
  { path: 'movies/:category', loadChildren: 'app/movies/movies.module#MoviesModule' },
  { path: 'genre/:id/:name', loadChildren: 'app/genre/genre.module#GenreModule' },
  { path: 'playlist/:category', loadChildren: 'app/playlist/playlist.module#PlaylistModule', canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
  { path: 'reset-password', loadChildren: 'app/reset-password/reset-password.module#ResetPasswordModule' },
  { path: 'search/:term', component: SearchComponent },
  { path: 'sign-in', loadChildren: 'app/sign-in/sign-in.module#SignInModule' },
  { path: 'sign-up', loadChildren: 'app/sign-up/sign-up.module#SignUpModule' },
  { path: 'star/:id', loadChildren: 'app/star/star.module#StarModule' },
  { path: '', redirectTo: '/movies/now-playing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);