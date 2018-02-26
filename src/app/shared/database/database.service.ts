import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';

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
      status: movie.status
    }

    return this.dbf.doc(`${category}/${this.uid}_${movie.id}`)
      .set(movieDetails)
      .then(success => {
        this.dbf.doc(`History/${this.uid}_${movie.id}`).set(movieDetails)
        callback()
      })
      .catch(err => callback(err));
  }

  deleteMovies(category: string, id: string, callback: any) {
    return this.dbf.doc(`${category}/${this.uid}_${id}`)
      .delete()
      .then(success => callback())
      .catch(err => callback(err))
  }

  deleteDatafromUser() {
  // waiting fea from firebase
  }

}
