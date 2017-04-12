import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { DataService } from '../shared/index';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  movies: any[];
  totalPages: number;
  pager: any = {}
  currentPage: number;

  constructor(private dataService: DataService, private route: ActivatedRoute, private location: Location, private snackbar: MdSnackBar) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return
    }
    this.pager = this.dataService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.route.params
      .switchMap((params: Params) => this.dataService.getSearchMovie(params['term'], this.currentPage))
      .subscribe(data => {
        if (data.total_results > 0) this.movies = data
        else {
          this.movies == null
          this.snackbar.open('No results found', 'hide', { duration: 10000 })
        }
      })
  }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getSearchMovie(params['term'], 1))
      .subscribe(data => {
        if (data.total_results > 0) {
          this.totalPages = data.total_pages
          this.setPage(1)
        }
        else this.movies == null
      })
  }
}