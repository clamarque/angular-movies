import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { MatFormFieldModule, MatIconModule, MatSidenavModule, MatSnackBarModule } from '@angular/material';

import { AuthService } from './shared/auth/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SwUpdate, ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        MatFormFieldModule,
        MatIconModule,
        MatSidenavModule,
        MatSnackBarModule,
        RouterTestingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        AuthService,
        AngularFireAuthModule,
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
/*
  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
  */
});
