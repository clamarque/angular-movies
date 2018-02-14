import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {

    redirectUrl: string;
    uid = '';
    moviesLaterCollection: AngularFirestoreCollection<any> = this.dbf.collection('movies-later');

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private dbf: AngularFirestore,
        private router: Router) {
        this.afAuth.authState.subscribe(auth => {
            auth ? this.uid = auth.uid : this.uid = null;
        });
    }

    signInAccount(name: string, callback: any) {
        return firebase.auth().signInWithPopup(this.getProvider(name))
            .then(success => callback())
            .catch(error => callback(error));
    }

    getProvider(name: string) {
        switch (name) {
            case 'google': return new firebase.auth.GoogleAuthProvider();
            case 'facebook': return new firebase.auth.FacebookAuthProvider();
            case 'twitter': return new firebase.auth.TwitterAuthProvider();
        }
    }

    signOut() {
        firebase.auth().signOut();
    }

    getMovies(category: string) {
        return this.dbf.collection(`${category}`, ref => ref
        .where('userId', '==', this.uid)
        .orderBy('date', 'desc')
        ).valueChanges()
    }

    setMovies(movie: any, category: string, callback: any) {
        console.log('movies:::', movie);
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

        /* return this.db.list(category + '/' + this.uid).valueChanges().subscribe(data => {
            console.log(data);
            const exists = false;
            for (let x of data) {
                // if (x.id == movie.id) exists = true
                callback('The movie is already recorded');
            }
            if (exists === false) {
                return this.db.list(category + '/' + this.uid).push({
                    'id': movie.id,
                    'original_title': movie.original_title,
                    'overview': movie.overview,
                    'popularity': movie.popularity,
                    'release_date': movie.release_date,
                    'poster_path': movie.poster_path,
                    'category': category
                })
                    .then(success => {
                        this.db.list('History/' + this.uid).push({
                            'category': category,
                            'id': movie.id,
                            'original_title': movie.original_title,
                            'poster_path': movie.poster_path
                        });
                        callback();
                    });
                    // .catch(error => callback(error))
            }
        });*/
    }

    deleteMovies(category: string, id: string, callback: any) {
        return this.dbf.doc(`${category}/${this.uid}_${id}`)
            .delete()
            .then(success => callback())
            .catch(err => callback(err))
    }

    deleteDatafromUser() {
        const item = this.db.list('MovieLater/' + this.uid);
        item.remove();
        const item1 = this.db.list('FavoriteMovie/' + this.uid);
        item1.remove();
    }

    readUser() {
        return this.afAuth.authState;
    }

    updateUser(formData, callback: any) {
        return this.afAuth.authState.subscribe(authState => {
            authState.updateEmail(formData.value.email).then(success => {
                return authState.updateProfile({
                    displayName: formData.value.displayName,
                    photoURL: ''
                });
            }, callback())
                .catch(error => callback(error));
        });
    }

    deleteUser(callback: any) {
        return this.afAuth.authState.subscribe(authState => {
            authState.delete()
                .then(success => callback())
                .catch(error => callback(error));
        });
    }

    isLoggedIn() {
        return this.afAuth.authState.map((auth) => {
            return auth === null ? false : true;
        });
    }
}
