import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TmdbService } from './tmdb.service';

describe('TmdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [TmdbService]
    });
  });

  it('should be created', inject([TmdbService], (service: TmdbService) => {
    expect(service).toBeTruthy();
  }));
});
