import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DatabaseService } from '../shared/database/database.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  isLoadingResults = true;
  moviesToWatch: any;
  moviesWatched: any;

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoadingResults = true;

    this.databaseService.getMovies('MovieLater').subscribe(response => {
      this.moviesToWatch = response.filter(val => val['watched'] === false);
      this.moviesWatched = response.filter(val => val['watched'] === true);
      this.isLoadingResults = false;
    });
  }

  deleteMovie(key: any) {
    this.databaseService.deleteMovies('MovieLater', key, error => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 10000 });
      } else {
        this.snackBar.open('Your movie was been delete', null, {
          duration: 5000
        });
      }
    });
  }

  watchedMovie(movieId: any, watched: boolean) {
    this.databaseService.updateMovie(movieId, watched, error => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 10000 });
      } else {
        this.snackBar.open('Your movie was been update', null, {
          duration: 5000
        });
      }
    });
  }
}
