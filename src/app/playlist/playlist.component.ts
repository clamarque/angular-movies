import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../shared/index';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html'
})
export class PlaylistComponent implements OnInit, OnDestroy {
    movies: Array<Object>;
    sub: Subscription;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
    ) { }

    deleteMovie(key: any) {
        const category = this.route.snapshot.paramMap.get('category');
        this.authService.deleteMovies(category, key);
    }

    ngOnInit() {
        this.sub = this.route.paramMap
            .switchMap((params: ParamMap) => this.authService.getMovies(params.get('category')))
            .subscribe(response => this.movies = response);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
