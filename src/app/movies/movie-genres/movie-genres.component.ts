import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { TmdbService } from 'app/shared/service/tmdb/tmdb.service';

@Component({
  selector: 'app-movie-genres',
  templateUrl: './movie-genres.component.html',
  styleUrls: ['./movie-genres.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieGenresComponent implements OnInit {
  request: any;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.tmdbService.getGenre().subscribe(response => {
      this.request = response.genres;
      console.log('test', this.request);

    });
  }

}
