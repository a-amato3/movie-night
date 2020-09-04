import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.model'
import { NavbarService } from 'src/app/navbar/services/navbar.service';
import { query, transition, trigger, style } from '@angular/animations';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations: [
    trigger('listAnimations', [
      transition('* <=> *', [
        query(':enter', [
          style({opacity: 0, transform: 'translateY(-50px)'})
        ])
      ])
    ])
  ]
})
export class MovieListComponent implements OnInit {

  loadingMovies: Array<Number>;
  movies$: Observable<Movie[]>

  constructor(private movieService: MovieService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.movies$ = this.movieService.getMoviesFromHttp();
    this.navbarService.title.next('Movie Night');

    this.loadingMovies = new Array(10).fill(0)
      .map((n, index) => index);
  }

}
