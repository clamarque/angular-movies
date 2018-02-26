import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { CastMovieModel } from '../../movies/shared/cast-movie.model';

@Injectable()
export class TmdbService {
  private api_key = '431bc17da732dfb3be082e58f7a5cf27';
  private url_discover = 'https://api.themoviedb.org/3/discover/movie';
  private url_search = 'https://api.themoviedb.org/3/search/movie';
  private url_movie = 'https://api.themoviedb.org/3/movie/';
  private url_person = 'https://api.themoviedb.org/3/person/';
  private url_genre = 'https://api.themoviedb.org/3/genre/';

  constructor(private http: HttpClient) { }

  getMovie(page: number, category: string) {
    switch (category) {
      case 'now-playing': return this.getNowPlaying(page);
      case 'upcoming': return this.getUpComing(page);
      case 'discover': return this.getMovieDiscover(page);
    }
  }
  getSearchMovie(name: string, page: number) {
    return this.http.get(`${this.url_search}?api_key=${this.api_key}&language=en&query=${name}&page=${page}`);
  }
  getNowPlaying(page: number) {
    return this.http.get(`${this.url_movie}now_playing?api_key=${this.api_key}&language=en&page=${page}`);
  }
  getDetailsMovie(code: number) {
    return this.http.get(`${this.url_movie}${code}?api_key=${this.api_key}&language=en`);
  }
  getMovieDiscover(page: number) {
    return this.http.get(`${this.url_discover}?api_key=${this.api_key}&language=en&sort_by=popularity.desc&page=${page}`);
  }
  getCastMovie(code: number) {
    return this.http.get(`${this.url_movie}${code}/credits?api_key=${this.api_key}`)
  }
  getVideoMovie(code: number) {
    return this.http.get(`${this.url_movie}${code}/videos?api_key=${this.api_key}&language=en`);
  }
  getGenreMovie(code: number, page: number) {
    return this.http.get(`${this.url_genre}${code}/movies?api_key=${this.api_key}&language=en&page=${page}`);
  }
  getSimilarMovies(code: number) {
    return this.http.get(`${this.url_movie}${code}/similar?api_key=${this.api_key}&language=en`);
  }
  getUpComing(page: number) {
    return this.http.get(`${this.url_movie}upcoming?api_key=${this.api_key}&language=en&page=${page}`);
  }
  getPerson(code: number) {
    return this.http.get(`${this.url_person}${code}?api_key=${this.api_key}&language=en`);
  }
  getPersonMovies(code: number) {
    return this.http.get(`${this.url_person}${code}/movie_credits?api_key=${this.api_key}&language=en`);
  }
  getPersonTv(code: number) {
    return this.http.get(`${this.url_person}${code}/tv_credits?api_key=${this.api_key}&language=en`);
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
    const pages = new Array(startPage, endPage + 1);

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
