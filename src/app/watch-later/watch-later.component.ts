import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../shared/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent implements OnInit {
    error: string;
    isConnected: boolean = false;
    movies: Array<Object>;
    baseUrl: string = 'https://www.youtube.com/embed/';
    url: any;
    sub: Subscription;

    constructor(private sanitizer: DomSanitizer, private authService: AuthService, private snackbar: MdSnackBar) { }

    seeTrailer(id: string) {
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
    }
    deleteMovie(key: any) {
        this.authService.deleteMovies('MovieLater', key);
    }
    ngOnInit() {
        this.sub = this.authService.getMovies('MovieLater').subscribe(data => {
            this.movies = data
        })

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}