import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule, FIREBASE_PROVIDERS, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { environment } from '../environments/environment';
import 'hammerjs';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogDeleteUser } from './profile/profile.component';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

import { AuthGuard, AuthService, DataService } from './shared/index';

@NgModule({
  declarations: [
    AppComponent,
    DialogDeleteUser,
    IndexComponent,
    SearchComponent,
    UpcomingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebaseAuthConfig),
    routing
  ],
  providers: [AuthGuard, AuthService, DataService],
  entryComponents: [
        DialogDeleteUser
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }