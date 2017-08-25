import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService, DataService } from '../shared/index';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html'
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
    let id = this.route.snapshot.paramMap.get('id');

    this.dataService.getPerson(+id).subscribe(response => this.person = response);
    this.dataService.getPersonMovies(+id).subscribe(response => this.movies = response.cast.slice(0, 6))
  }
}