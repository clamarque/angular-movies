import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()

export class AuthService {

    redirectUrl: string;
    uid = '';

    constructor(private afAuth: AngularFireAuth, private router: Router) {
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
