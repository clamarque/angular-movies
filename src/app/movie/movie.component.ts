import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DatabaseService } from '../shared/database/database.service';
import { AuthService } from '../shared/auth/auth.service';
import { TmdbService } from '../shared/tmdb/tmdb.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: Object;
  videos: Array<Object>;
  similarMovies: Array<Object>;
  cast: Array<Object>;
  error: string;
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  safeUrl: any;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults = false;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackbar: MatSnackBar,
    private tmdbService: TmdbService) { }

    swipe(action = this.SWIPE_ACTION.RIGHT) {
      if (action === this.SWIPE_ACTION.RIGHT || action === this.SWIPE_ACTION.LEFT) {
        window.history.back();
      }
    }

  saveMovie(movie: any, category: string) {
    this.databaseService.setMovies(movie, category, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'Hide', { duration: 10000 });
      } else {
        this.snackbar.open('Your movie was been save', '', { duration: 5000 });
      }
    });
  }

  getMovieVideoUrl(id: string) {
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.route.paramMap
      .switchMap((params: ParamMap) => this.tmdbService.getDetailsMovie(+params.get('id')))
      .subscribe(response => {
        this.isLoadingResults = false;
        this.movie = response;
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => this.tmdbService.getCastMovie(+params.get('id')))
      .subscribe(response => this.cast = response.cast.slice(0, 6));

    this.route.paramMap
      .switchMap((params: ParamMap) => this.tmdbService.getVideoMovie(+params.get('id')))
      .subscribe(response => {
        this.videos = response.results.slice(0, 1);
        for (const x of this.videos) {
          this.getMovieVideoUrl(x['key']);
        }
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => this.tmdbService.getSimilarMovies(+params.get('id')))
      .subscribe(response => this.similarMovies = response.results.slice(0, 6));

    return this.authService.isLoggedIn().subscribe(
      authStatus => {
        authStatus === true ? this.isConnected = true : this.isConnected = false;
      });
  }
}
