import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {

    redirectUrl: string;
    uid: string = '';

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
        this.afAuth.authState.subscribe(auth => {
            if (auth) this.uid = auth.uid
        })
    }

    signInAccount(name: string, callback: any) {
        return firebase.auth().signInWithPopup(this.getProvider(name))
            .then(success => callback())
            .catch(error => callback(error))
    }

    getProvider(name: string) {
        switch (name) {
            case 'google': return new firebase.auth.GoogleAuthProvider();
            case 'facebook': return new firebase.auth.FacebookAuthProvider();
            case 'twitter': return new firebase.auth.TwitterAuthProvider();
        }
    }

    signOut() {
        firebase.auth().signOut()
    }

    getMovies(category: string) {
        return this.db.list(category + '/' + this.uid).valueChanges()
    }

    setMovies(movie: any, category: string, callback: any) {
        return this.db.list(category + '/' + this.uid).valueChanges().subscribe(data => {
            console.log(data)
            let exists = false
            for (let x of data) {
                //if (x.id == movie.id) exists = true
                callback('The movie is already recorded')
            }
            if (exists == false) {
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
                        })
                        callback()
                    })
                    //.catch(error => callback(error))
            }
        })
    }

    deleteMovies(category: string, id: string) {
        let item = this.db.list(category + '/' + this.uid);
        item.remove(id)
    }

    deleteDatafromUser() {
        let item = this.db.list('MovieLater/' + this.uid)
        item.remove()
        let item1 = this.db.list('FavoriteMovie/' + this.uid)
        item1.remove()
    }

    readUser() {
        return this.afAuth.authState
    }

    updateUser(formData, callback: any) {
        return this.afAuth.authState.subscribe(authState => {
            authState.updateEmail(formData.value.email).then(success => {
                return authState.updateProfile({
                    displayName: formData.value.displayName,
                    photoURL: ''
                })
            }, callback())
                .catch(error => callback(error))
        })
    }

    deleteUser(callback: any) {
        return this.afAuth.authState.subscribe(authState => {
            authState.delete()
                .then(success => callback())
                .catch(error => callback(error))
        })
    }

    isLoggedIn() {
        return this.afAuth.authState.map((auth) => {
            return auth === null ? false : true
        });
    }
}