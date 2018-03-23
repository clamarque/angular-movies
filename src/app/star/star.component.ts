import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
/* SERVICES */
import { TmdbService } from '../shared/service/tmdb/tmdb.service';
/* MODEL */
import { MoviePersonModel } from '../movies/shared/movie-person.model';
import { TvCastModel } from '../movies/shared/tv-cast.model';
import { MovieCastModel } from '../movies/shared/movie-cast.model';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  person: MoviePersonModel;
  movies: MovieCastModel[];
  tv_credits: TvCastModel[];
  isLoadingResults = false;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    const id = this.route.snapshot.paramMap.get('id');
    const getPerson = this.tmdbService.getPerson(+id);
    const getPersonMovies = this.tmdbService.getPersonMovies(+id);
    const getPersonTv = this.tmdbService.getPersonTv(+id);

    forkJoin(getPerson, getPersonMovies, getPersonTv).subscribe(([person, movies, tv_credits]) => {
      this.isLoadingResults = false;
      this.person = person;
      this.movies = movies.cast.slice(0, 10);
      this.tv_credits = tv_credits.cast.slice(0, 10);
    })

  }

  back() {
    this.location.back();
  }
}
