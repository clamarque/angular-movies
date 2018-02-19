import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { LazyLoadImageModule } from 'ng-lazyload-image';
/* FIREBASE */
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/* Environment & ServiceWorker */
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
/* ROUTING */
import { routing } from './app-routing.module';
/* COMPONENT */
import { AppComponent } from './app.component';
import { DialogDeleteUser } from './profile/profile.component';
import { MoviesComponent } from './movies/movies.component';
import { PageNotFoundComponent } from './not-found.component';
/* SERVICES */
import { AuthService } from './shared/auth/auth.service';
import { DatabaseService } from './shared/database/database.service';
import { TmdbService } from './shared/tmdb/tmdb.service';
import { CheckForUpdateService } from './shared/sw/check-for-update.service';
import { LogUpdateService } from './shared/sw/log-update.service';
import { PromptUpdateService } from './shared/sw/prompt-update.service';
/* GUARD */
import { AuthGuard } from './shared/guard/auth.guard';
/* SHARED */
import { SharedModule } from './shared/shared.module';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';
// import { MovieListComponent } from './movies/movie-list/movie-list.component';
// import { MovieComponent } from './movies/movie/movie.component';

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
    MoviesComponent,
    MovieListComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpModule,
    CdkTableModule,
    SharedModule,
    LazyLoadImageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthGuard,
    AuthService,
    DatabaseService,
    TmdbService,
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig},
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService
  ],
  entryComponents: [
        DialogDeleteUser
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
