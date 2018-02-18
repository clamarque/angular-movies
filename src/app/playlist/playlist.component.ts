import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { MatSnackBar } from '@angular/material';
import { DatabaseService } from '../shared/database/database.service';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit, OnDestroy {
    movies: any[];
    getData = false;
    sub: Subscription;
    isLoadingResults = true;

    constructor(
        private databaseService: DatabaseService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    deleteMovie(key: any) {
        const category = this.route.snapshot.paramMap.get('category');
        this.databaseService.deleteMovies(category, key, (error) => {
            if (error) {
              this.snackBar.open(error, 'Hide', { duration: 10000 });
            } else {
              this.snackBar.open('Your movie was been delete', null , { duration: 5000 });
            }
        })
    }

    ngOnInit() {
        this.isLoadingResults = true;

        this.sub = this.route.paramMap
            .switchMap((params: ParamMap) => this.databaseService.getMovies(params.get('category')))
            .subscribe(response => {
                this.isLoadingResults = false;

                if (response !== null) {
                    this.movies = response;
                } else {
                    this.movies = null;
                    this.getData = true;
                }
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
