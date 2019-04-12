import { Component, OnInit } from '@angular/core';
import { MovieCategoryModel } from './shared/movie-category.model';
import { MovieModel } from './shared/movie.model';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { TmdbService } from 'app/shared/service/tmdb/tmdb.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { StorageService } from 'app/shared/service/storage/storage.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  request: Observable<MovieCategoryModel>;
  dataParam: string;
  movies: MovieModel[];
  currentPage: number;
  parameter: string | number;
  pager: any = {};
  totalPages: number;
  title: string | number;
  isLoadingResults: boolean;
  lang: string;
  adult: string;
  moviesType: any;

  constructor(
    public authService: AuthService,
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.lang = this.storageService.read('language');
    this.adult = this.storageService.read('adult');
    this.currentPage = 1;
    const getCurrentPage: string = sessionStorage.getItem('hubmovies-current-page');
    getCurrentPage ? this.currentPage = Number(getCurrentPage) : this.currentPage = 1;

    this.route.params.subscribe((params: Params) => {
      this.moviesType = params;
      this.getMovies(this.currentPage, this.moviesType);
    });
  }

  swipe(currentIndex: number) {
    this.setPage(currentIndex);
  }

  setPage(page: number) {
    this.isLoadingResults = true;
    if (page < 1 || page > this.pager.totalPages) {
      this.isLoadingResults = false;
      return;
    }

    this.pager = this.tmdbService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    sessionStorage.setItem('hubmovies-current-page', this.currentPage.toString());
    this.getMovies(this.currentPage, this.moviesType );
  }

  getMovies(currentPage: number, params: any) {
    if (params.term) {
      this.request = this.tmdbService.getSearchMovie(
        params.term,
        currentPage,
        this.lang,
        this.adult
      );
      this.parameter = params.term;
    } else if (params.category) {
      this.request = this.tmdbService.getMovie(
        params.category,
        currentPage,
        this.lang,
        this.adult
      );
      this.parameter = params.category;
    } else if (params.id && params.name) {
      this.request = this.tmdbService.getGenreMovie(
        +params.id,
        currentPage,
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

        this.isLoadingResults = false;
        this.title = this.parameter;
        this.totalPages = response.total_pages;
        this.pager = this.tmdbService.getPager(this.totalPages, currentPage);
      }, error => {
        this.isLoadingResults = false;
      });
    }
    this.isLoadingResults = false;
  }

}
