import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Event as NavigationEvent } from '@angular/router';
import { DatabaseService } from '../../shared/service/database/database.service';
import { AuthService } from '../../core/auth/auth.service';
import { TmdbService } from '../../shared/service/tmdb/tmdb.service';
import { forkJoin ,  Subscription } from 'rxjs';

import { MovieCastModel } from '../shared/movie-cast.model';
import { MovieCrewModel } from '../shared/movie-crew.model';
import { MovieVideosModel } from '../shared/movie-videos.model';
import { Location } from '@angular/common';
import { MovieModel } from '../shared/movie.model';
import { MovieDetailsModel } from '../shared/movie-details.model';
import { MovieDatabaseModel } from '../../shared/model/movie-database.model';

import { ShareModalComponent } from '../../shared/component/share-modal/share-modal.component';
import { StorageService } from '../../shared/service/storage/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: number;
  url: string;
  movie: MovieDetailsModel;
  videos: Array<Object>;
  similarMovies: MovieModel[];
  cast: MovieCastModel[];
  crew: MovieCrewModel[];
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  safeUrl: Object;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults: boolean;
  sub: Subscription;
  getCategories: Array<Object>;
  categories = [];
  lang: string;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private tmdbService: TmdbService,
    private storageService: StorageService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.lang = this.storageService.read('language');

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      const dataMovie = this.tmdbService.getDetailsMovie(this.id, this.lang);
      const castMovie = this.tmdbService.getCastMovie(this.id);
      const videoMovie = this.tmdbService.getVideoMovie(this.id, this.lang);
      const similarVideo = this.tmdbService.getSimilarMovies(this.id, this.lang);

      forkJoin(dataMovie, castMovie, videoMovie, similarVideo).subscribe(([movie, credits, video, similar]) => {
        this.isLoadingResults = false;
        this.movie = movie;
        this.cast = credits.cast.slice(0, 10);
        this.videos = video.results.slice(0, 1);
        if (this.videos.length > 0) {
          this.getMovieVideoUrl(this.videos[0]['key']);
        }
        this.similarMovies = similar.results;
      });
    });
  }

  back() {
    this.location.back();
  }

  getAllCategories() {
    this.sub = this.databaseService.getAllCategoriesUser().subscribe(response => {
      this.getCategories = response;
      this.categories = this.getCategories.map(value => value['name']);
    });
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT || action === this.SWIPE_ACTION.LEFT) {
      this.location.back();
    }
  }

  pushMovieCategoryDefault(movie: MovieDatabaseModel, category: string) {
    this.databaseService.addMovieCategoriesDefault(movie, category, (error) => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.translateService.get('Error.Movie-added').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
      }
    });
  }

  getMovieVideoUrl(id: string) {
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  pushMovieCategory(movie: any, category: string) {
    this.databaseService.addMovieCategory(movie, category, (error) => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.translateService.get('Error.Movie-added').subscribe(results => this.snackBar.open(results, '', { duration: 2000 }));
      }
    });
  }

  shareDialog(movie: MovieDatabaseModel): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      data: { id: movie.movieId, original_title: movie.original_title }
    });
  }
}
