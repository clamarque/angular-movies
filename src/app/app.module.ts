import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
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
import { SettingsComponent } from './settings/settings.component';
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
  };
}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    MoviesComponent,
    MovieListComponent,
    MovieComponent,
    SettingsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    CoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
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
