import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from '@firebase/util';
import { MovieCategoryModel } from '../../../shared/model/movie-category.model';

@Injectable()
export class DatabaseService {
  uid = '';

  constructor(private afAuth: AngularFireAuth, private dbf: AngularFirestore) {
    this.afAuth.authState.subscribe(auth => {
      auth ? this.uid = auth.uid : this.uid = null;
    });
  }

  getMovies(category: string) {
    return this.dbf.collection(`${category}`, ref => ref
      .where('userId', '==', this.uid)
      .orderBy('date', 'desc')
    ).valueChanges()
  }

  getCategoriesMovies(category: string) {
    return this.dbf.collection(`${category}`, ref => ref
      .where('userId', '==', this.uid)
      .orderBy('date', 'desc')
    ).valueChanges()
  }

  updateMovie(movieId: number, watched: boolean, callback: any) {
    this.dbf.doc(`MovieLater/${this.uid}_${movieId}`)
    .update({
      'watched': watched
    })
    .then(success => callback())
    .catch(err => callback(err));
  }

  setMovies(movie: any, category: string, callback: any) {
    const movieDetails = {
      userId: this.uid,
      movieId: movie.id,
      date: new Date(),
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      category: category,
      status: movie.status,
      watched: false
    }

    return this.dbf.doc(`${category}/${this.uid}_${movie.id}`)
      .set(movieDetails)
      .then(success => callback())
      .catch(err => callback(err));
  }

  deleteMovies(category: string, id: string, callback: any) {
    return this.dbf.doc(`${category}/${this.uid}_${id}`)
      .delete()
      .then(success => callback())
      .catch(err => callback(err))
  }

  deleteDatafromUser() {
  // waiting feature from firebase
  }

}
