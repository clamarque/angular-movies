import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router, Event as NavigationEvent } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatabaseService } from '../../shared/database/database.service';
import { AuthService } from '../../shared/auth/auth.service';
import { TmdbService } from '../../shared/tmdb/tmdb.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { VideoMovieModel } from '../shared/video-movie.model';
import { MovieCastModel } from '../shared/movie-cast.model';
import { MovieCrewModel } from '../shared/movie-crew.model';
import { MovieVideosModel } from '../shared/movie-videos.model';
import { MovieSimilarModel } from '../shared/movie-similar.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: number;
  url: string;
  movie: Object;
  videos: Array<Object>;
  similarMovies: Array<Object>;
  cast: MovieCastModel[];
  crew: MovieCrewModel[];
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  safeUrl: any;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults = false;
  test: any;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private tmdbService: TmdbService) { }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT || action === this.SWIPE_ACTION.LEFT) {
      window.history.back();
    }
  }

  saveMovie(movie: any, category: string) {
    this.databaseService.setMovies(movie, category, (error) => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 10000 });
      } else {
        this.snackBar.open('Your movie was been save', '', { duration: 5000 });
      }
    });
  }

  getMovieVideoUrl(id: string) {
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {
    this.isLoadingResults = true;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      const dataMovie = this.tmdbService.getDetailsMovie(this.id);
      const castMovie = this.tmdbService.getCastMovie(this.id);
      const videoMovie = this.tmdbService.getVideoMovie(this.id);
      const similarVideo = this.tmdbService.getSimilarMovies(this.id);

      forkJoin(dataMovie, castMovie, videoMovie, similarVideo).subscribe(([movie, cast, video, similar]) => {
        console.log(movie);
        this.isLoadingResults = false;
        this.movie = movie;
        this.cast = cast.cast.slice(0, 10);

        this.videos = video.results.slice(0, 1);
        if (this.videos.length > 0) {
          this.getMovieVideoUrl(this.videos[0]['key'])
        }
        this.similarMovies = similar.results;
      })
    })

    return this.authService.isLoggedIn().subscribe(
      authStatus => {
        authStatus === true ? this.isConnected = true : this.isConnected = false;
      });
  }

  back() {
    this.location.back();
}
}
