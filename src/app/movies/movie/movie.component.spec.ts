import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatProgressSpinnerModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatTabsModule,
  MatSnackBarModule,
  MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieComponent } from './movie.component';

import { AuthService } from '../../core/auth/auth.service';
import { DatabaseService } from '../../shared/database/database.service';
import { TmdbService } from '../../shared/tmdb/tmdb.service';
import { StorageService } from '../../shared/storage/storage.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import 'hammerjs';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

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
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        LazyLoadImageModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTabsModule,
        RouterTestingModule
      ],
      declarations: [ MovieComponent ],
      providers: [
        AngularFireAuthModule,
        AuthService,
        DatabaseService,
        TmdbService,
        StorageService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
