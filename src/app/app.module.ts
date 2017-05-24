import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';
import 'hammerjs';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogDeleteUser } from './profile/profile.component';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { PageNotFoundComponent } from './not-found.component';
import { UpcomingComponent } from './upcoming/upcoming.component';

import { AuthGuard, AuthService, DataService } from './shared/index';

@NgModule({
  declarations: [
    AppComponent,
    DialogDeleteUser,
    IndexComponent,
    PageNotFoundComponent,
    SearchComponent,
    UpcomingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing
  ],
  providers: [AuthGuard, AuthService, DataService],
  entryComponents: [
        DialogDeleteUser
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }