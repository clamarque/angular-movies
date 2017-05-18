import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/index';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})

export class UpcomingComponent implements OnInit {
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
        this.dataService.getUpComing(this.currentPage).subscribe( response => this.movies = response )
    }

    ngOnInit() {
        this.dataService.getUpComing(1).subscribe(response => {
            this.totalPages = response.total_pages
            this.setPage(1)
        })
    }
}