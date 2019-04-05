import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MoviesComponent } from './movies/movies.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: 'movies/:category', component: MoviesComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'genre', component: MovieListComponent },
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
  { path: 'playlist', loadChildren: 'app/playlist/playlist.module#PlaylistModule', canActivate: [AuthGuard] },
  { path: 'categories', loadChildren: 'app/categories/categories.module#CategoriesModule', canActivate: [AuthGuard] },
  { path: 'account', loadChildren: 'app/account/account.module#AccountModule', canActivate: [AuthGuard] },
  { path: 'sign-in', loadChildren: 'app/sign-in/sign-in.module#SignInModule' },
  { path: 'star/:id', loadChildren: 'app/star/star.module#StarModule' },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/movies/now-playing', pathMatch: 'full' },
  { path: '**', redirectTo: '/movies/now-playing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
