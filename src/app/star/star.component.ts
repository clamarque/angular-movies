import { Location, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationEnd } from '@angular/router';
import { AuthService, DataService } from '../shared/index';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {
  person: any[];
  movies: any[];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.dataService.getPerson(+params['id']))
      .subscribe(response => {
        this.person = response
      })

    this.route.params
      .switchMap((params: Params) => this.dataService.getPersonMovies(+params['id']))
      .subscribe(response => {
        this.movies = response.cast.slice(0,6)
      })
  }

}
