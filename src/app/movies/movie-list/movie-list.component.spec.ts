import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MovieListComponent } from './movie-list.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { TmdbService } from '../../shared/tmdb/tmdb.service';
import { StorageService } from '../../shared/storage/storage.service';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        RouterTestingModule,
        LazyLoadImageModule,
        HttpClientTestingModule
      ],
      declarations: [ MovieListComponent ],
      providers: [
        StorageService,
        TmdbService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
