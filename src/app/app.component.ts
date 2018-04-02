import { Component, HostListener, OnInit, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { StorageService } from './shared/service/storage/storage.service';
import { TranslateService } from '@ngx-translate/core';

import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;
    lang: string = this.storageService.read('language');
    private _mobileQueryListener: () => void;
    @ViewChild('snav') snav: any;

    constructor(
        public authService: AuthService,
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private router: Router,
        private snackbar: MatSnackBar,
        private storageService: StorageService,
        public translateService: TranslateService,
        private swUpdate: SwUpdate
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 731px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.translateService.setDefaultLang('en-US');
    }

    ngOnInit() {
        if (!this.lang) {
            this.storageService.save('language', 'en-US');
        }
        const lang = this.storageService.read('language');
        this.translateService.use(lang);
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                if (confirm('New version available. Load New Version?')) {
                    location.reload();
                }
            })
        }
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
      }

    @HostListener('window:scroll', ['$event']) scrollHandler(event) {
        const number = window.scrollY;
        const el = document.getElementById('btn-returnToTop');
        if (number >= 500) {
            el.className = 'show';

        } else {
            el.className = 'hide';
        }
    }

    scrollTop() {
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
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
        this.translateService.get('Error.Goodbye').subscribe(results => this.snackbar.open(results, '', { duration: 2000 }));
        this.router.navigate(['/movies/list/now-playing']);
    }

    closeSidenav() {
        if (this.mobileQuery.matches !== false) {
            this.snav.close();
        }
    }

}
