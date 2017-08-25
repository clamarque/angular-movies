import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService, DataService } from '../shared/index';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {
  movie: Object;
  videos: Array<Object>;
  similarMovies: Array<Object>;
  cast: Array<Object>;
  error: string;
  isConnected: boolean = false;
  baseUrl: string = 'https://www.youtube.com/embed/';
  safeUrl: any;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private snackbar: MdSnackBar) { }

  saveMovie(movie: any, category: string) {
    this.authService.setMovies(movie, category, (error) => {
      if (error) {
        this.error = error
        this.snackbar.open(this.error, 'Hide', { duration: 10000 })
      }
      else {
        this.snackbar.open('Your movie was been save', '', { duration: 5000 })
      }
    })
  }

  getMovieVideoUrl(id: string) {
    return this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + id);
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.dataService.getDetailsMovie(+params.get('id')))
      .subscribe(response => this.movie = response);

    this.route.paramMap
      .switchMap((params: ParamMap) => this.dataService.getCastMovie(+params.get('id')))
      .subscribe(response => this.cast = response.cast.slice(0, 6));

    this.route.paramMap
      .switchMap((params: ParamMap) => this.dataService.getVideoMovie(+params.get('id')))
      .subscribe(response => {
        this.videos = response.results.slice(0, 1);
        for (let x of this.videos) {
          this.getMovieVideoUrl(x["key"])
        }
      });

    this.route.paramMap
      .switchMap((params: ParamMap) => this.dataService.getSimilarMovies(+params.get('id')))
      .subscribe(response => this.similarMovies = response.results.slice(0, 6));

    return this.authService.isLoggedIn().subscribe(
      authStatus => {
        if (authStatus == true) return this.isConnected = true
        else return this.isConnected = false
      })
  }
}