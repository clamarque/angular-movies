import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule, MatIconModule, MatMenuModule, MatListModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { PlaylistComponent } from './playlist.component';

import { DatabaseService } from '../shared/database/database.service';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;

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
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      declarations: [ PlaylistComponent ],
      providers: [
        AngularFireAuthModule,
        DatabaseService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
