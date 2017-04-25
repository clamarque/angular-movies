import { ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/index';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'discover', loadChildren: 'app/discover/discover.module#DiscoverModule' },
    { path: 'favorites', loadChildren: 'app/favorite/favorite.module#FavoriteModule', canActivate: [AuthGuard] },
    { path: 'movie/:id', loadChildren: 'app/movie/movie.module#MovieModule' },
    { path: 'genre/:id/:name', loadChildren: 'app/genre/genre.module#GenreModule'},
    { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canActivate: [AuthGuard] },
    { path: 'reset-password', loadChildren: 'app/reset-password/reset-password.module#ResetPasswordModule' },
    { path: 'search/:term', component: SearchComponent },
    { path: 'sign-in', loadChildren: 'app/sign-in/sign-in.module#SignInModule' },
    { path: 'sign-up', loadChildren: 'app/sign-up/sign-up.module#SignUpModule' },
    { path: 'star/:id', loadChildren: 'app/star/star.module#StarModule' },
    { path: 'upcoming', component: UpcomingComponent },
    { path: 'watch-later' , loadChildren: 'app/watch-later/watch-later.module#WatchLaterModule', canActivate: [AuthGuard] }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);