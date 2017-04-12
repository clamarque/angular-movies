import { Component } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './shared/index';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  movieSearching: any[];
    isConnected: boolean = false;
    color = 'primary';
    
    constructor(private authService: AuthService, private router: Router, private snackbar: MdSnackBar) { }

    searchMovie(term: string) {
        if (term === '') {
            this.router.navigate(['/index']);
        }
        else {
            this.router.navigate(['/search', term]);
        }
    }
    onSignOut() {
        this.authService.signOut();
        this.snackbar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 })
        this.router.navigate(['/index'])
    }
    ngOnInit() {
      return this.authService.isLoggedIn().subscribe(
            authStatus => {
                console.log('connected:', authStatus)
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
}