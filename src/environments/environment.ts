// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { AngularFireModule, FIREBASE_PROVIDERS, AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

export const environment = {
  production: false,
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