import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {

    redirectUrl: string;
    uid: string = '';

    constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
        this.afAuth.subscribe(auth => {
            if (auth) this.uid = auth.uid
        })
    }

    signIn(email: string, password: string, callback: any) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(success => callback())
            .catch(error => callback(error))
    }
    signInAccount(name: string, callback: any) {
        return firebase.auth().signInWithPopup(this.getProvider(name))
            .then(success => callback())
            .catch(error => callback(error))
    }

    getProvider(name: string) {
        switch (name) {
            case 'google': return new firebase.auth.GoogleAuthProvider();
            //case 'facebook': return new firebase.auth.FacebookAuthProvider();
            case 'twitter': return new firebase.auth.TwitterAuthProvider();
        }
    }

    signOut() {
        firebase.auth().signOut()
    }

    signUp(formData, callback: any) {
        return firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(success => {
                return firebase.auth().currentUser.updateProfile({
                    displayName: formData.username,
                    photoURL: ''
                }), callback();
            })
            .catch(error => callback(error))

        /* this.af.auth.createUser({
             email: formData.email, password: formData.password
         }).then(authState => {
             authState.auth.updateProfile({
                 displayName: formData.username,
                 photoURL: ''
             }), callback();
             return authState;
         }, (error) => callback(error));*/
    }

    resetPasswordEmail(email: string, callback: any) {
        return firebase.auth().sendPasswordResetEmail(email)
            .then(success => callback())
            .catch(error => callback(error))
    }

    getMovies(category: string) {
        return this.db.list(category + '/' + this.uid)
    }

    setMovies(movie: any, category: string, callback: any) {
        return this.db.list(category + '/' + this.uid).subscribe(data => {
            let exists = false
            for (let x of data) {
                if (x.id == movie.id) exists = true
                callback('The movie is already recorded')
            }
            if (exists == false) {
                return this.db.list(category + '/' + this.uid).push({
                    'id': movie.id,
                    'original_title': movie.original_title,
                    'overview': movie.overview,
                    'popularity': movie.popularity,
                    'release_date': movie.release_date,
                    'poster_path': movie.poster_path
                })
                    .then(success => callback())
                    .catch(error => callback(error))
            }
        })
    }

    deleteMovies(category: string, id: string) {
        let item = this.db.list(category + '/' + this.uid)
        item.remove(id)
    }

    deleteDatafromUser() {
        let item = this.db.list('MovieLater/' + this.uid)
        item.remove()
        let item1 = this.db.list('FavoriteMovie/' + this.uid)
        item1.remove()
    }

    readUser() {
        return this.afAuth
    }

    updateUser(formData, callback: any) {
        return this.afAuth.subscribe(authState => {
            authState.auth.updateEmail(formData.value.email).then(success => {
                return authState.auth.updateProfile({
                    displayName: formData.value.displayName,
                    photoURL: ''
                })
            }, callback())
                .catch(error => callback(error))
        })
    }

    deleteUser(callback: any) {
        return this.afAuth.subscribe(authState => {
            authState.auth.delete()
                .then(success => callback())
                .catch(error => callback(error))
        })
    }

    isLoggedIn() {
        return this.afAuth.map((auth) => {
            if (auth === null) return false
            else return true
        });
    }
}