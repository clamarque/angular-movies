import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../shared/database/database.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';

interface History {
    category: string;
    id: number;
    original_title: string;
    poster_path: string;
}

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, OnDestroy {
    movies: any[];
    displayedColumns = ['poster_path', 'original_title', 'category', 'action'];
    dataSource: HistoryDataSource;
    sub: Subscription;
    isLoadingResults = true;


    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private databaseService: DatabaseService,
        private snackBar: MatSnackBar) {
    }

    deleteMovie(key: any) {
        this.databaseService.deleteMovies('History', key, (error) => {
            if (error) {
                this.snackBar.open(error, 'hide' , { duration: 5000});
            } else {
                this.snackBar.open('Your movie was been delete', null , { duration: 5000 });
            }
        });
    }

    ngOnInit() {
        this.isLoadingResults = true;

        this.sub = this.databaseService.getMovies('History').subscribe(response => {
            this.isLoadingResults = false;
            this.movies = response;
            this.dataSource = new HistoryDataSource(this.movies);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

export class HistoryDataSource extends DataSource<History> {
    constructor(private history: History[]) {
        super();
    }

    connect(): Observable<History[]> {
        return Observable.of(this.history);
    }

    disconnect() { }
}
