import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseAuthState, AuthMethods, AuthProviders } from 'angularfire2'
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {

    authState: FirebaseAuthState
    redirectUrl: string;
    uid: string = '';

    constructor(private af: AngularFire, private router: Router) {
        this.af.auth.subscribe(auth => {
            if (auth) this.uid = auth.uid
        })
    }

    signIn(email: string, password: string, callback: any) {
        return this.af.auth.login({ email: email, password: password })
            .then(success => callback())
            .catch(error => callback(error))
    }
    signInAccount(name: string, callback: any) {
        return this.af.auth.login({
            provider: this.getProvider(name),
            method: AuthMethods.Popup,
        })
            .then(success => callback())
            .catch(error => callback(error))
    }

    getProvider(name: string) {
        switch (name) {
            case 'google': return AuthProviders.Google;
            case 'facebook': return AuthProviders.Facebook;
            case 'twitter': return AuthProviders.Twitter;
        }
    }

    signOut() {
        this.af.auth.logout()
    }

    signUp(formData, callback: any): firebase.Promise<FirebaseAuthState> {
        return this.af.auth.createUser({
            email: formData.email, password: formData.password
        }).then(authState => {
            authState.auth.updateProfile({
                displayName: formData.username,
                photoURL: ''
            }), callback();
            return authState;
        }, (error) => callback(error));
    }

    resetPasswordEmail(email: string, callback: any) {
        return firebase.auth().sendPasswordResetEmail(email)
            .then(success => callback())
            .catch(error => callback(error))
    }

    getMovies(category: string) {
        return this.af.database.list(category + '/' + this.uid)
    }

    setMovies(movie: any, category: string, callback: any) {
        return this.af.database.list(category + '/' + this.uid).subscribe(data => {
            let exists = false
            for (let x of data) {
                if (x.id == movie.id) exists = true
                callback('The movie is already recorded')
            }
            if (exists == false) {
                return this.af.database.list(category + '/' + this.uid).push({
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
        let item = this.af.database.list(category + '/' + this.uid)
        item.remove(id)
    }

    deleteDatafromUser() {
        let item = this.af.database.list('MovieLater/' + this.uid)
        item.remove()
        let item1 = this.af.database.list('FavoriteMovie/' + this.uid)
        item1.remove()
    }

    readUser() {
        return this.af.auth
    }

    updateUser(formData, callback: any) {
        return this.af.auth.subscribe(authState => {
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
        return this.af.auth.subscribe(authState => {
            authState.auth.delete()
                .then(success => callback())
                .catch(error => callback(error))
        })
    }

    isLoggedIn() {
        return this.af.auth.map((auth) => {
            if (auth === null) return false
            else return true
        });
    }
}