import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TmdbService } from '../shared/tmdb/tmdb.service';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html'
})
export class StarComponent implements OnInit {
  person: Object;
  movies: Array<Object>;
  tv_credits: Array<Object>;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.tmdbService.getPerson(+id).subscribe(response => this.person = response);
    this.tmdbService.getPersonMovies(+id).subscribe(response => this.movies = response.cast.slice(0, 6));
    this.tmdbService.getPersonTv(+id).subscribe(response => this.tv_credits = response.cast.slice(0, 10));
  }
}
