import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../shared/index';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  title: string;
  movies: Object;
  totalPages: number;
  pager: any = {}
  currentPage: number;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return
    }
    this.pager = this.dataService.getPager(this.totalPages, page);
    this.currentPage = this.pager.currentPage;
    this.dataService.getNowPlaying(this.currentPage).subscribe(response => this.movies = response)
  }

  ngOnInit() {
    this.dataService.getNowPlaying(1).subscribe(response => {
      this.totalPages = response.total_pages
      this.setPage(1)
    })

    this.route.params
      .switchMap((params: Params) => this.dataService.getGenreMovie(+params['id']))
      .subscribe(response => this.movies = response)

    this.route.params.subscribe((params) => this.title = (params['name']))
  }

}