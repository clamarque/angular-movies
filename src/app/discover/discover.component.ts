import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/index';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})

export class DiscoverComponent implements OnInit {
  movies: Object;
  totalPages: number;
  pager: any = {}
  currentPage: number;

  constructor(private dataService: DataService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return
    }
    this.pager = this.dataService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.dataService.getMovieDiscover(this.currentPage).subscribe(response => {
      this.movies = response
    })
  }

  ngOnInit() {
    this.dataService.getMovieDiscover(1).subscribe(response => {
      this.totalPages = response.total_pages
      this.setPage(1)
    })
  }
}