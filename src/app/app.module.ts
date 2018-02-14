import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import 'hammerjs';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogDeleteUser } from './profile/profile.component';
import { PageNotFoundComponent } from './not-found.component';

import { AuthGuard, AuthService, DataService } from './shared/index';
import { MoviesComponent } from './movies/movies.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pinch': { enable: false},
    'rotate': { enable: false}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    DialogDeleteUser,
    PageNotFoundComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    CdkTableModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [AuthGuard, AuthService, DataService, { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}, AngularFireDatabase],
  entryComponents: [
        DialogDeleteUser
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
