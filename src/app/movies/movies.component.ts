import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';
import { DatabaseService } from '../shared/database/database.service';
import { TmdbService } from '../shared/tmdb/tmdb.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  request: any;
  dataTitle: any;
  dataParam: any;
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
        this.request = this.tmdbService.getMovie(this.currentPage, param);
      } else {
        this.request = this.tmdbService.getSearchMovie(param, this.currentPage);
      }
    }

    if (typeof param === 'number') {
      this.request = this.tmdbService.getGenreMovie(param, this.currentPage);
    }

    this.request.subscribe(response => this.movies = response);
  }

  ngOnInit() {
    this.isLoadingResults = true;

    this.route.params.subscribe((params: Params) => {
      if (params['term']) {
        this.request = this.tmdbService.getSearchMovie(params['term'], 1);
        this.parameter = params['term'];
      } else if (params['category']) {
        this.request = this.tmdbService.getMovie(1, params['category'])
        this.parameter = params['category'];
      } else if (params['id'] && params['name']) {
        this.request = this.tmdbService.getGenreMovie(+params['id'], 1);
        this.parameter = +params['id'];
        this.dataParam = params['name'];
      }
      this.request.subscribe(response => {
        console.log(response);
        this.isLoadingResults = false;
        this.title = this.parameter;
        this.totalPages = response.total_pages;
        this.setPage(this.parameter, 1);
      });
    });
  }

}
