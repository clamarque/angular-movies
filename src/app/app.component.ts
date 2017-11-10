import { Component, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './shared/index';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    movieSearching: any[];
    isConnected: boolean = false;
    color = 'primary';

    constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) { }

    @HostListener('window:scroll', ['$event']) scrollHandler(event) {
        const number = window.scrollY;
        let el = document.getElementById('return-to-top');
        if (number >= 50) {
            el.className = "show";

        } else {
            el.className = "hide";
        }
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    searchMovie(term: string) {
        if (term === '') {
            this.router.navigate(['/movies/now-playing']);
        }
        else {
            this.router.navigate(['/search', { term: term }]);
        }
    }
    onSignOut() {
        this.authService.signOut();
        this.snackbar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 })
        this.router.navigate(['/movies/now-playing'])
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