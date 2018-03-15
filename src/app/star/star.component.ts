import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
/* SERVICES */
import { TmdbService } from '../shared/tmdb/tmdb.service';
/* MODEL */
import { MoviePersonModel } from '../movies/shared/movie-person.model';
import { TvCastModel } from '../movies/shared/tv-cast.model';
import { MovieCastModel } from '../movies/shared/movie-cast.model';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  person: MoviePersonModel;
  movies: MovieCastModel[];
  tv_credits: TvCastModel[];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.tmdbService.getPerson(+id).subscribe(response => this.person = response);
    this.tmdbService.getPersonMovies(+id).subscribe(response => this.movies = response.cast.slice(0, 10));
    this.tmdbService.getPersonTv(+id).subscribe(response => this.tv_credits = response.cast.slice(0, 10));
  }

  back() {
    this.location.back();
  }
}
