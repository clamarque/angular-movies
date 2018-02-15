import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../shared/database/database.service';
import { TmdbService } from '../shared/tmdb/tmdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Object;
  currentPage: number;
  parameter: any;
  pager: any = {};
  totalPages: number;
  title: string;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  isLoadingResults = true;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute) { }

  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT || action === this.SWIPE_ACTION.LEFT) {
      this.setPage(this.parameter, currentIndex);
    }
  }

  setPage(param: any, page: number) {

    if (page < 1 || page > this.pager.totalPages) { return; }

    this.pager = this.tmdbService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;

    if (typeof param === 'string') {
      if (param === 'discover' || param === 'upcoming' || param === 'now-playing') {
        this.tmdbService.getMovie(this.currentPage, param).subscribe(response => this.movies = response);
      } else {
        this.tmdbService.getSearchMovie(param, this.currentPage).subscribe(response => this.movies = response);
      }
    }

    if (typeof param === 'number') {
      this.tmdbService.getGenreMovie(param, this.currentPage).subscribe(response => this.movies = response);
    }
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.route.params.subscribe((params: Params) => {
      if (params['term']) {
        this.tmdbService.getSearchMovie(params['term'], 1).subscribe(response => {
          this.isLoadingResults = false;
          this.title = (params['term']);
          this.totalPages = response.total_pages;
          this.parameter = params['term'];
          this.setPage(this.parameter, 1);
        });
      }
      if (params['category']) {
        this.tmdbService.getMovie(1, params['category']).subscribe(response => {
          this.isLoadingResults = false;
          this.title = (params['category']);
          this.totalPages = response.total_pages;
          this.parameter = params['category'];
          this.setPage(this.parameter, 1);
        });
      }
      if (params['id'] && params['name']) {
        this.tmdbService.getGenreMovie(+params['id'], 1).subscribe(response => {
          this.isLoadingResults = false;
          this.title = (params['name']);
          this.totalPages = response.total_pages;
          this.parameter = +params['id'];
          this.setPage(this.parameter, 1);
        });
      }
    });
  }

}
