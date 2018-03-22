import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StorageService } from '../../shared/storage/storage.service';

import { MovieDetailsModel } from '../../movies/shared/movie-details.model';
import { MovieCategoryModel } from '../../movies/shared/movie-category.model';
import { MovieCreditsModel } from '../../movies/shared/movie-credits.model';
import { MoviePersonModel } from '../../movies/shared/movie-person.model';
import { MovieVideosModel } from '../../movies/shared/movie-videos.model';
import { TvCreditsModel } from '../../movies/shared/tv-credits.model';

@Injectable()
export class TmdbService {
  private api_key = '431bc17da732dfb3be082e58f7a5cf27';
  private url_discover = 'https://api.themoviedb.org/3/discover/movie';
  private url_search = 'https://api.themoviedb.org/3/search/movie';
  private url_movie = 'https://api.themoviedb.org/3/movie';
  private url_person = 'https://api.themoviedb.org/3/person';
  private url_genre = 'https://api.themoviedb.org/3/genre';

  private lang = this.storageService.read('language');

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getMovie(page: number, category: string) {
    switch (category) {
      case 'now-playing': return this.getNowPlaying(page);
      case 'upcoming': return this.getUpComing(page);
      case 'discover': return this.getMovieDiscover(page);
    }
  }
  getSearchMovie(name: string, page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_search}?api_key=${this.api_key}&language=${this.lang}&query=${name}&page=${page}`);
  }
  getNowPlaying(page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_movie}/now_playing?api_key=${this.api_key}&language=${this.lang}&page=${page}`);
  }
  getDetailsMovie(movie_id: number): Observable<MovieDetailsModel> {
    return this.http.get<MovieDetailsModel>(`${this.url_movie}/${movie_id}?api_key=${this.api_key}&language=${this.lang}`);
  }
  getMovieDiscover(page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`
      ${this.url_discover}?api_key=${this.api_key}&language=${this.lang}&sort_by=popularity.desc&page=${page}
    `);
  }
  getCastMovie(movie_id: number): Observable<MovieCreditsModel> {
    return this.http.get<MovieCreditsModel>(`${this.url_movie}/${movie_id}/credits?api_key=${this.api_key}`)
  }
  getVideoMovie(movie_id: number): Observable<MovieVideosModel> {
    return this.http.get<MovieVideosModel>(`${this.url_movie}/${movie_id}/videos?api_key=${this.api_key}&language=${this.lang}`);
  }
  getGenreMovie(genre_id: number, page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`
      ${this.url_genre}/${genre_id}/movies?api_key=${this.api_key}&language=${this.lang}&page=${page}
    `);
  }
  getSimilarMovies(movie_id: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_movie}/${movie_id}/similar?api_key=${this.api_key}&language=${this.lang}`);
  }
  getUpComing(page: number): Observable<MovieCategoryModel> {
    return this.http.get<MovieCategoryModel>(`${this.url_movie}/upcoming?api_key=${this.api_key}&language=${this.lang}&page=${page}`);
  }
  getPerson(person_id: number): Observable<MoviePersonModel> {
    return this.http.get<MoviePersonModel>(`${this.url_person}/${person_id}?api_key=${this.api_key}&language=${this.lang}`);
  }
  getPersonMovies(person_id: number): Observable<MovieCreditsModel> {
    return this.http.get<MovieCreditsModel>(`${this.url_person}/${person_id}/movie_credits?api_key=${this.api_key}&language=${this.lang}`);
  }
  getPersonTv(person_id: number): Observable<TvCreditsModel> {
    return this.http.get<TvCreditsModel>(`${this.url_person}/${person_id}/tv_credits?api_key=${this.api_key}&language=${this.lang}`);
  }
  getPager(totalItems: number, currentPage: number = 1) {
    const totalPages = totalItems;
    let startPage = 0;
    let endPage = 0;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = new Array(startPage, currentPage, endPage);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

}
