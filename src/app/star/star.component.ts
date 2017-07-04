import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService, DataService } from '../shared/index';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  person: Object;
  movies: Array<Object>;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getPerson(+params['id']))
      .subscribe(response => this.person = response )

    this.route.params
      .switchMap((params: Params) => this.dataService.getPersonMovies(+params['id']))
      .subscribe(response => this.movies = response.cast.slice(0,6))
  }
}