import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../shared/index';
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
export class HistoryComponent implements OnInit {
    isConnected: boolean = false;
    movies: Array<any>;
    displayedColumns = ['poster_path', 'original_title', 'category', 'action'];
    dataSource: HistoryDataSource;
    sub: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private snackbar: MatSnackBar) {
        //this.getData();
    }

    deleteMovie(key: any) {
        console.log(`key ${key}`);
        this.authService.deleteMovies('History', key);
    }

    ngOnInit() {

        this.sub = this.authService.getMovies('History').subscribe(response => {
            this.movies = response;
            this.dataSource = new HistoryDataSource(this.movies)
        });

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
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
