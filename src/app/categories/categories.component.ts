import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../shared/service/database/database.service';
import { MatDialog, MatDialogRef , MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { MovieCategoryModel } from '../shared/model/movie-category.model';
import { Subscription } from 'rxjs/Subscription';
import { ShareModalComponent } from '../shared/component/share-modal/share-modal.component';
import { CategoriesAddModalComponent } from './categories-add-modal/categories-add-modal.component';
import { CategoriesDeleteModalComponent } from './categories-delete-modal/categories-delete-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  movies: Array<Object>;
  getCategories: Array<Object>;
  isLoadingResults: boolean;
  sub: Subscription;
  title = 'Categories';
  categories = [];

  constructor(
    private databaseService: DatabaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.sub = this.databaseService.getCategoriesMovies('FavoriteMovie').subscribe(response => {
      console.log(response);
      this.movies = response;
      this.isLoadingResults = false;
    });

    this.sub = this.databaseService.getAllCategoriesUser().subscribe(response => {
      console.log(response);
      this.getCategories = response;
      this.categories = this.getCategories.map(value => value['name']);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  tabChanged(event: MatTabChangeEvent) {
    const name = event.tab.textLabel;
    if (name !== 'FAVORITES') {
      this.sub = this.databaseService.getCategoryUser(name).subscribe(response => {
        this.movies = response;
        console.log(response);
      })
    } else {
      this.sub = this.databaseService.getCategoriesMovies('FavoriteMovie').subscribe(response => {
        this.movies = response;
        this.isLoadingResults = false;
      });
    }
  }

  deleteMovieFromFavorites(key: any) {
    this.databaseService.deleteMovies('FavoriteMovie', key, (error) => {
        if (error) {
          this.snackBar.open(error, 'Hide', { duration: 5000 });
        } else {
          this.snackBar.open('Your movie was been delete', null , { duration: 2000 });
        }
    })
  }

  deleteMovieFromCategory(category: string, id: number) {
    this.databaseService.deleteMovieFromCategory(category, id, (error) => {
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

  addCategoryDialog() {
    const dialogRef = this.dialog.open(CategoriesAddModalComponent, {
      data: {name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.databaseService.addCategories(result, (error) => {
          if (error) {
            this.snackBar.open(error, 'hide', { duration: 5000});
          } else {
            this.snackBar.open('Categories updated', null, { duration: 2000});
          }
        })
      }
    });
  }

  deleteCategoryDialog() {
    const dialogRef = this.dialog.open(CategoriesDeleteModalComponent, {
      width: '250px',
      data: {name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.databaseService.deleteCategories(result, (error) => {
          if (error) {
            this.snackBar.open(error, 'hide', { duration: 5000});
          } else {
            this.snackBar.open('Categories updated', null, { duration: 2000});
          }
        })
      }
    });
  }

}
