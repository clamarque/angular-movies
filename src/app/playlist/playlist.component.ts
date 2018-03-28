import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DatabaseService } from '../shared/service/database/database.service';
import { Subscription } from 'rxjs/Subscription';

import { ShareModalComponent } from '../shared/component/share-modal/share-modal.component';
import { MovieDatabaseModel } from '../shared/model/movie-database.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
  isLoadingResults: boolean;
  moviesToWatch: Array<Object> = [];
  moviesWatched: Array<Object> = [];
  title = 'Playlist';
  sub: Subscription;

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.isLoadingResults = true;
    this.sub = this.databaseService.getMoviesCategoriesDefault('MovieLater').subscribe(response => {
      this.moviesToWatch = response.filter(val => val['watched'] === false);
      this.moviesWatched = response.filter(val => val['watched'] === true);
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteMovie(id: number) {
    this.databaseService.deleteMoviesCategoriesDefault('MovieLater', id, error => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.snackBar.open('Your movie was been delete', null, { duration: 2000 });
      }
    });
  }

  shareDialog(movie: MovieDatabaseModel): void {
    const dialogRef = this.dialog.open(ShareModalComponent, {
      data: { id: movie.movieId, original_title: movie.original_title }
    })
  }

  watchedMovie(movieId: number, watched: boolean) {
    this.databaseService.updateMovieCategoriesDefault(movieId, watched, error => {
      if (error) {
        this.snackBar.open(error, 'Hide', { duration: 5000 });
      } else {
        this.snackBar.open('Your movie was been update', null, { duration: 2000 });
      }
    });
  }
}
