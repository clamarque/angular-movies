import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, DataService } from '../shared/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
    error: string;
    isConnected: boolean = false;
    movies: Array<Object>;
    baseUrl: string = 'https://www.youtube.com/embed/';
    url: any;
    sub: Subscription;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private dataService: DataService,
        private snackbar: MdSnackBar) { }

    deleteMovie(key: any) {
        this.authService.deleteMovies('MovieLater', key);
    }
    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.authService.getMovies(params['category']))
            .subscribe(response => {
                console.log('res', response)
                this.movies = response
            })

        return this.authService.isLoggedIn().subscribe(
            authStatus => {
                if (authStatus == true) return this.isConnected = true
                else return this.isConnected = false
            })
    }
}