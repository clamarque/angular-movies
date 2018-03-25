import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/service/database/database.service';
import { MatDialog, MatDialogRef , MatSnackBar } from '@angular/material';
import { MovieCategoryModel } from '../shared/model/movie-category.model';
import { Subscription } from 'rxjs/Subscription';
import { ShareModalComponent } from '../shared/component/share-modal/share-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  movies: any;
  isLoadingResults: boolean;
  sub: Subscription;
  title = 'Categories';

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.sub = this.databaseService.getCategoriesMovies('FavoriteMovie').subscribe(response => {
      this.movies = response;
      this.isLoadingResults = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  deleteMovie(key: any) {
    this.databaseService.deleteMovies('FavoriteMovie', key, (error) => {
        if (error) {
          this.snackBar.open(error, 'Hide', { duration: 5000 });
        } else {
          this.snackBar.open('Your movie was been delete', null , { duration: 2000 });
        }
    })
}

shareDialog(movie: MovieCategoryModel): void {
  const dialogRef = this.dialog.open(ShareModalComponent, {
    data: { id: movie.movieId, original_title: movie.original_title }
  })
}

}
