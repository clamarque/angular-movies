import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { DatabaseService } from '../../shared/service/database/database.service';
import { StorageService } from '../../shared/service/storage/storage.service';
import { TmdbService } from '../../shared/service/tmdb/tmdb.service';
import { MovieCategoryModel } from '../shared/movie-category.model';
import { MovieModel } from '../shared/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  request: Observable<MovieCategoryModel>;
  dataParam: string;
  movies: MovieModel[];
  moviesLength: number;
  currentPage: number;
  parameter: string | number;
  pager: any = {};
  totalPages: number;
  title: string | number;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults: boolean;
  lang: string;
  adult: string;

  constructor(
    public authService: AuthService,
    private databaseService: DatabaseService,
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private storageService: StorageService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.lang = this.storageService.read('language');
    this.adult = this.storageService.read('adult');

    this.route.params.subscribe((params: Params) => {
      if (params.term) {
        this.request = this.tmdbService.getSearchMovie(
          params.term,
          1,
          this.lang,
          this.adult
        );
        this.parameter = params.term;
      } else if (params.category) {
        this.request = this.tmdbService.getMovie(
          params.category,
          1,
          this.lang,
          this.adult
        );
        this.parameter = params.category;
      } else if (params.id && params.name) {
        this.request = this.tmdbService.getGenreMovie(
          +params.id,
          1,
          this.lang,
          this.adult
        );
        this.parameter = +params.id;
        this.dataParam = params.name;
      } else {
        this.request = null;
        this.isLoadingResults = false;
      }
      if (this.request) {
        this.request.subscribe(response => {
          this.parameter === 'upcoming'
            ? (this.movies = response.results.filter(val =>
              dayjs(val.release_date).isAfter(dayjs().startOf('year'))
            ))
            : (this.movies = response.results);

          this.moviesLength = response.results.length;
          this.isLoadingResults = false;
          this.title = this.parameter;
          this.totalPages = response.total_pages;
          this.pager = this.tmdbService.getPager(this.totalPages, 1);
        }, error => {
          this.isLoadingResults = false;
        });
      } else {
        this.isLoadingResults = false;
      }
    });
  }

  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    if (
      action === this.SWIPE_ACTION.RIGHT ||
      action === this.SWIPE_ACTION.LEFT
    ) {
      this.setPage(this.parameter, currentIndex);
    }
  }

  setPage(param: string | number, page: number) {
    this.isLoadingResults = true;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.tmdbService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    if (typeof param === 'string') {
      if (
        param === 'discover' ||
        param === 'upcoming' ||
        param === 'now-playing'
      ) {
        this.request = this.tmdbService.getMovie(
          param,
          this.currentPage,
          this.lang,
          this.adult
        );
      } else {
        this.request = this.tmdbService.getSearchMovie(
          param,
          this.currentPage,
          this.lang,
          this.adult
        );
      }
    }

    if (typeof param === 'number') {
      this.request = this.tmdbService.getGenreMovie(
        param,
        this.currentPage,
        this.lang,
        this.adult
      );
    }
    if (!navigator.onLine) {
      this.snackBar.open('Sorry, you\'re offline', null, { duration: 5000 });
    } else {
      this.request.subscribe(response => {
        this.isLoadingResults = false;
        param === 'upcoming'
          ? (this.movies = response.results.filter(val =>
            dayjs(val.release_date).isAfter(dayjs().startOf('year'))
          ))
          : (this.movies = response.results);
      }, error => {
        this.isLoadingResults = false;
      });
    }
  }

  addMovie(movie: any) {
    this.databaseService.addMovieCategoriesDefault(
      movie,
      'MovieLater',
      error => {
        if (error) {
          this.snackBar.open(error, 'Hide', { duration: 5000 });
        } else {
          this.translateService
            .get('Error.Movie-added')
            .subscribe(results =>
              this.snackBar.open(results, '', { duration: 2000 })
            );
        }
      }
    );
  }
}
