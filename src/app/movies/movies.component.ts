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
    totalPages: number;
    pager: any = {}
    currentPage: number;

    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return
        }
        this.pager = this.dataService.getPager(this.totalPages, page);
        this.currentPage = this.pager.currentPage;
        this.route.params
            .switchMap((params: Params) => this.dataService.getMovie(this.currentPage, params['category']))
            .subscribe(response => {
                this.movies = response
            })
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.dataService.getMovie(1, params['category']))
            .subscribe(response => {
                this.totalPages = response.total_pages
                this.setPage(1)
            })
    }
}