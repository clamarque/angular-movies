import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DatabaseService } from '../shared/database/database.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  isLoadingResults = true;
  moviesToWatch: any;
  moviesWatched: any;
  sub: Subscription

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoadingResults = true;

    this.sub = this.databaseService.getMovies('MovieLater').subscribe(response => {
      this.moviesToWatch = response.filter(val => val['watched'] === false);
      this.moviesWatched = response.filter(val => val['watched'] === true);
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteMovie(key: any) {
    this.databaseService.deleteMovies('MovieLater', key, error => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.snackBar.open('Your movie was been delete', null, { duration: 2000 });
      }
    });
  }

  watchedMovie(movieId: any, watched: boolean) {
    this.databaseService.updateMovie(movieId, watched, error => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.snackBar.open('Your movie was been update', null, { duration: 2000 });
      }
    });
  }
}
