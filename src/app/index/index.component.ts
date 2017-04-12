import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    movies: any[];
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
        this.dataService.getNowPlaying(this.currentPage).subscribe(response => {
            this.movies = response
        })
    }

    ngOnInit() {
        this.dataService.getNowPlaying(1).subscribe(response => {
            this.totalPages = response.total_pages
            this.setPage(1)
        })
    }
}