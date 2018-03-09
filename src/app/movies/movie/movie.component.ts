import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router, Event as NavigationEvent } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatabaseService } from '../../shared/database/database.service';
import { AuthService } from '../../shared/auth/auth.service';
import { TmdbService } from '../../shared/tmdb/tmdb.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { CastModel } from '../shared/cast.model';
import { CastMovieModel } from '../shared/cast-movie.model';
import { VideoMovieModel } from '../shared/video-movie.model';

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
  cast: Array<Object>;
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  safeUrl: any;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults = false;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
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

      forkJoin(dataMovie, castMovie, videoMovie, similarVideo).subscribe(results => {
        this.isLoadingResults = false;
        this.movie = results[0];
        this.cast = results[1]['cast'].slice(0, 9);
        this.videos = results[2]['results'].slice(0, 1);
        if (this.videos.length > 0) {
          this.getMovieVideoUrl(this.videos[0]['key'])
        }
        this.similarMovies = results[3]['results'].slice(0, 9);
      })
    })

    return this.authService.isLoggedIn().subscribe(
      authStatus => {
        authStatus === true ? this.isConnected = true : this.isConnected = false;
      });
  }
}
