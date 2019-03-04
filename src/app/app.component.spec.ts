import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { AuthService } from './core/auth/auth.service';
import { StorageService } from './shared/service/storage/storage.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Observable, of} from 'rxjs';
import { ServiceWorkerModule } from '@angular/service-worker';

const translations: any = {'foo': 'bar'};

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('AppComponent', () => {
  const firebaseConfig = {
    apiKey: 'foo',
    authDomain: 'bar',
    databaseURL: 'baz',
    projectId: '0',
    storageBucket: 'foo',
    messagingSenderId: 'bar'
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatToolbarModule,
        RouterTestingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        }),
        ServiceWorkerModule.register('', {enabled: false})
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthService,
        AngularFireAuthModule,
        AngularFirestoreModule,
        StorageService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
