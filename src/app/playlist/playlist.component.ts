import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import { MatSnackBar } from '@angular/material';
import { DatabaseService } from '../shared/database/database.service';
import { MovieCategoryModel } from './shared/movie-category.model';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
    movies: MovieCategoryModel;
    sub: Subscription;
    isLoadingResults = true;
    moviesToWatch: any;
    moviesWatched: any;

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
                this.moviesToWatch = response.filter(val => val['watched'] === false);
                this.moviesWatched = response.filter(val => val['watched'] === true);
                this.isLoadingResults = false;
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    watchedMovie(movieId: any, watched: boolean) {
        this.databaseService.updateMovie(movieId, watched, (error) => {
            if (error) {
                this.snackBar.open(error, 'Hide', { duration: 10000 });
              } else {
                this.snackBar.open('Your movie was been update', null, { duration: 5000 });
              }
        })
      }
}
