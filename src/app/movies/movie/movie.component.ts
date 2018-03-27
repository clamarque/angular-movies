import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Event as NavigationEvent } from '@angular/router';
import { DatabaseService } from '../../shared/service/database/database.service';
import { AuthService } from '../../core/auth/auth.service';
import { TmdbService } from '../../shared/service/tmdb/tmdb.service';
import { forkJoin } from 'rxjs/observable/forkJoin';

import { MovieCastModel } from '../shared/movie-cast.model';
import { MovieCrewModel } from '../shared/movie-crew.model';
import { MovieVideosModel } from '../shared/movie-videos.model';
import { Location } from '@angular/common';
import { MovieModel } from '../shared/movie.model';
import { MovieDetailsModel } from '../shared/movie-details.model';
import { MovieCategoryModel } from '../../shared/model/movie-category.model';

import { ShareModalComponent } from '../../shared/component/share-modal/share-modal.component';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, AfterViewInit {
  id: number;
  url: string;
  movie: MovieDetailsModel;
  videos: Array<Object>;
  similarMovies: MovieModel[];
  cast: MovieCastModel[];
  crew: MovieCrewModel[];
  isConnected = false;
  baseUrl = 'https://www.youtube.com/embed/';
  safeUrl: any;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults = false;
  sub: Subscription;
  getCategories: any;
  categories = [];

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private tmdbService: TmdbService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = +params.get('id');
      const dataMovie = this.tmdbService.getDetailsMovie(this.id);
      const castMovie = this.tmdbService.getCastMovie(this.id);
      const videoMovie = this.tmdbService.getVideoMovie(this.id);
      const similarVideo = this.tmdbService.getSimilarMovies(this.id);

      forkJoin(dataMovie, castMovie, videoMovie, similarVideo).subscribe(([movie, credits, video, similar]) => {
        this.isLoadingResults = false;
        this.movie = movie;
        this.cast = credits.cast.slice(0, 10);
        this.videos = video.results.slice(0, 1);
        if (this.videos.length > 0) {
          this.getMovieVideoUrl(this.videos[0]['key']);
        }
        this.similarMovies = similar.results;
      })
    })
  }

  ngAfterViewInit() {

  }

  back() {
    this.location.back();
  }

  getAllCategories() {
    this.sub = this.databaseService.getAllCategoriesUser().subscribe(response => {
      console.log(response);
      this.getCategories = response;
      this.categories = this.getCategories.map(value => value['name']);
    })
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT || action === this.SWIPE_ACTION.LEFT) {
      this.location.back();
    }
  }

  saveMovie(movie: any, category: string) {
    this.databaseService.setMovies(movie, category, (error) => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.snackBar.open('Your movie was been save', '', { duration: 2000 });
      }
    });
  }

  getMovieVideoUrl(id: string) {
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  updateMovie(movie: any, category: string) {
    this.databaseService.updateCategories(movie, category, (error) => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.snackBar.open('Your movie was been save', '', { duration: 2000 });
      }
    })
  }

  shareDialog(movieId: MovieCategoryModel, movieTitle: MovieCategoryModel): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      data: { id: movieId, original_title: movieTitle }
    })
  }
}
