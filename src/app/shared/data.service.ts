import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    private api_key = '431bc17da732dfb3be082e58f7a5cf27';
    private url_discover = 'https://api.themoviedb.org/3/discover/movie';
    private url_search = 'https://api.themoviedb.org/3/search/movie';
    private url_movie = 'https://api.themoviedb.org/3/movie/';
    private url_person = 'https://api.themoviedb.org/3/person/';
    private url_genre = "https://api.themoviedb.org/3/genre/"

    constructor(private http: Http) { }

    getSearchMovie(name: string, page: number) {
        return this.http.get(`${this.url_search}?api_key=${this.api_key}&language=en&query=${name}&page=${page}`)
            .map(res => res.json())
    }
    getNowPlaying(page: number) {
        return this.http.get(`${this.url_movie}now_playing?api_key=${this.api_key}&language=en&page=${page}`)
            .map((res: Response) => res.json())
    }
    getDetailsMovie(code: number) {
        return this.http.get(`${this.url_movie}${code}?api_key=${this.api_key}&language=en`)
            .map((res: Response) => res.json())
    }
    getMovieDiscover(page: number) {
        return this.http.get(`${this.url_discover}?api_key=${this.api_key}&language=en&sort_by=popularity.desc&page=${page}`)
            .map((res: Response) => res.json())
    }
    getCastMovie(code: number) {
        return this.http.get(`${this.url_movie}${code}/credits?api_key=${this.api_key}`)
            .map((res: Response) => res.json())
    }
    getVideoMovie(code: number) {
        return this.http.get(`${this.url_movie}${code}/videos?api_key=${this.api_key}&language=en`)
            .map((res: Response) => res.json())
    }
    getGenreMovie(code: number) {
        return this.http.get(`${this.url_genre }${code}/movies?api_key=${this.api_key}&language=en`)
            .map((res: Response) => res.json())
    }
    getSimilarMovies(code: number) {
        return this.http.get(`${this.url_movie}${code}/similar?api_key=${this.api_key}&language=en`)
            .map((res: Response) => res.json())
    }
    getUpComing(page: number) {
        return this.http.get(`${this.url_movie}upcoming?api_key=${this.api_key}&language=en&page=${page}`)
            .map((res: Response) => res.json())
    }
    getPerson(code: number) {
        return this.http.get(`${this.url_person}${code}'?api_key=${this.api_key}&language=en`)
            .map((res: Response) => res.json())
    }
    getPersonMovies(code: number) {
        return this.http.get(`${this.url_person}${code}/movie_credits?api_key=${this.api_key}&language=en`)
            .map((res: Response) => res.json())
    }
    getPager(totalItems: number, currentPage: number = 1) {
        let totalPages = totalItems
        let startPage: number, endPage: number;
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
        let pages = new Array(startPage, endPage + 1);

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