import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import 'hammerjs';
import { LazyLoadImageModule } from 'ng-lazyload-image';
/* FIREBASE */
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
/* Environment & ServiceWorker */
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
/* ROUTING */
import { AppRoutingModule } from './app-routing.module';
/* COMPONENT */
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieComponent } from './movies/movie/movie.component';
import { PageNotFoundComponent } from './not-found.component';
/* SERVICES */
import { CheckForUpdateService } from './shared/service/sw/check-for-update.service';
import { LogUpdateService } from './shared/service/sw/log-update.service';
import { PromptUpdateService } from './shared/service/sw/prompt-update.service';
import { StorageService } from './shared/service/storage/storage.service';
/* SHARED */
import { SharedModule } from './shared/shared.module';
/* CORE MODULE */
import { CoreModule } from '../app/core/core.module';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pinch': { enable: false},
    'rotate': { enable: false}
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MoviesComponent,
    MovieListComponent,
    MovieComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CoreModule,
    HttpClientModule,
    CdkTableModule,
    SharedModule.forRoot(),
    LazyLoadImageModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig },
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
