import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    if (action === this.SWIPE_ACTION.RIGHT || action === this.SWIPE_ACTION.LEFT) {
      this.setPage(this.parameter, currentIndex);
    }
  }

  setPage(param: any, page: number) {

    if (page < 1 || page > this.pager.totalPages) { return; }

    this.pager = this.dataService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;

    if (typeof param === 'string') {
      if (param === 'discover' || param === 'upcoming' || param === 'now-playing') {
        this.dataService.getMovie(this.currentPage, param).subscribe(response => this.movies = response);
      } else {
        this.dataService.getSearchMovie(param, this.currentPage).subscribe(response => this.movies = response);
      }
    }

    if (typeof param === 'number') {
      this.dataService.getGenreMovie(param, this.currentPage).subscribe(response => this.movies = response);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params['term']) {
        this.dataService.getSearchMovie(params['term'], 1).subscribe(response => {
          this.title = (params['term']);
          this.totalPages = response.total_pages;
          this.parameter = params['term'];
          this.setPage(this.parameter, 1);
        });
      }
      if (params['category']) {
        this.dataService.getMovie(1, params['category']).subscribe(response => {
          this.title = (params['category']);
          this.totalPages = response.total_pages;
          this.parameter = params['category'];
          this.setPage(this.parameter, 1);
        });
      }
      if (params['id'] && params['name']) {
        this.dataService.getGenreMovie(+params['id'], 1).subscribe(response => {
          this.title = (params['name']);
          this.totalPages = response.total_pages;
          this.parameter = +params['id'];
          this.setPage(this.parameter, 1);
        });
      }
    });
  }

}
