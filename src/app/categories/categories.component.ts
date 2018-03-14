import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/database/database.service';
import { MatSnackBar } from '@angular/material';
import { MovieCategoryModel } from '../movies/shared/movie-category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  movies: any;
  isLoadingResults: boolean;

  constructor(
    private databaseService: DatabaseService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.databaseService.getCategoriesMovies('FavoriteMovie').subscribe(response => {
      this.movies = response;
      this.isLoadingResults = false;
    });
  }

  deleteMovie(key: any) {
    this.databaseService.deleteMovies('FavoriteMovie', key, (error) => {
        if (error) {
          this.snackBar.open(error, 'Hide', { duration: 10000 });
        } else {
          this.snackBar.open('Your movie was been delete', null , { duration: 5000 });
        }
    })
}

}
