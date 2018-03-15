import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { StarComponent } from './star.component';

import { TmdbService } from '../shared/tmdb/tmdb.service';
import { StorageService } from '../shared/storage/storage.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('StarComponent', () => {
  let component: StarComponent;
  let fixture: ComponentFixture<StarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        LazyLoadImageModule,
        MatIconModule,
        MatTabsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [ StarComponent ],
      providers: [
        StorageService,
        TmdbService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
