import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AngularFireModule, FIREBASE_PROVIDERS, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { environment } from '../environments/environment';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscoverComponent } from './discover/discover.component';
import { DialogDeleteUser } from './profile/profile.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { IndexComponent } from './index/index.component';
import { MovieComponent } from './movie/movie.component';
import { ProfileComponent } from './profile/profile.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchComponent } from './search/search.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { WatchLaterComponent } from './watch-later/watch-later.component';

import { AuthGuard, AuthService, DataService } from './shared/index';

@NgModule({
  declarations: [
    AppComponent,
    DiscoverComponent,
    DialogDeleteUser,
    FavoriteComponent,
    IndexComponent,
    MovieComponent,
    ProfileComponent,
    ResetPasswordComponent,
    SearchComponent,
    SignInComponent,
    SignUpComponent,
    UpcomingComponent,
    WatchLaterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebaseAuthConfig),
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService, DataService],
  entryComponents: [
        DialogDeleteUser
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }