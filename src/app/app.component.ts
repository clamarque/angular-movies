import { Component, HostListener, OnInit, NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { StorageService } from './shared/storage/storage.service';
// import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    movieSearching: any[];
    isConnected = false;
    color = 'primary';
    languages = [
        {value: 'en-En', viewValue: 'English'},
        {value: 'fr-FR', viewValue: 'French'},
      ];
      lang = this.storageService.read('language');

    constructor(
        public authService: AuthService,
        private router: Router,
        private snackbar: MatSnackBar,
        private storageService: StorageService,
        // private swUpdate: SwUpdate
    ) { }

    @HostListener('window:scroll', ['$event']) scrollHandler(event) {
        const number = window.scrollY;
        const el = document.getElementById('return-to-top');
        if (number >= 50) {
            el.className = 'show';

        } else {
            el.className = 'hide';
        }
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }
    getChangedValue(event) {
        this.storageService.save('language', event.value);
        location.reload();
    }

    searchMovie(term: string) {
        if (term === '') {
            this.router.navigate(['/movies/list/now-playing']);
        } else {
            this.router.navigate(['/movies/search', { term: term }]);
        }
    }

    onSignOut() {
        this.authService.signOut();
        this.snackbar.open('Already Gone ? We Hope to see you again soon', '', { duration: 5000 });
        this.router.navigate(['/movies/list/now-playing']);
    }

    ngOnInit() {
       /* if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            })
        } */
    }
}
