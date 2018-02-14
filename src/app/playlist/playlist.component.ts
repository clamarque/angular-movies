import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../shared/index';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit, OnDestroy {
    movies: any[];
    getData = false;
    sub: Subscription;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) { }

    deleteMovie(key: any) {
        const category = this.route.snapshot.paramMap.get('category');
        this.authService.deleteMovies(category, key, (error) => {
            if (error) {
              this.snackBar.open(error, 'Hide', { duration: 10000 });
            } else {
              this.snackBar.open('Your movie was been delete', null , { duration: 5000 });
            }
        })
    }

    ngOnInit() {
        this.sub = this.route.paramMap
            .switchMap((params: ParamMap) => this.authService.getMovies(params.get('category')))
            .subscribe(response => {
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
