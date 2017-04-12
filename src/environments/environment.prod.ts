import { AngularFireModule, FIREBASE_PROVIDERS, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyAV6yhUmJWeYYgJIH2_Op8VgTMa1JX9mI4",
    authDomain: "hubmovies-a26fc.firebaseapp.com",
    databaseURL: "https://hubmovies-a26fc.firebaseio.com",
    storageBucket: "hubmovies-a26fc.appspot.com",
    messagingSenderId: "559417527686"
  },
  firebaseAuthConfig: {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }
};