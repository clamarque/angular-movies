import { TestBed, inject } from '@angular/core/testing';

import { TmdbService } from './tmdb.service';

describe('TmdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TmdbService]
    });
  });

  it('should be created', inject([TmdbService], (service: TmdbService) => {
    expect(service).toBeTruthy();
  }));
});
