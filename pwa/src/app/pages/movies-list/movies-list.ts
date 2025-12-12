import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'app-movies-list',
  imports: [RouterLink],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  movies = signal<Movie[]>([]);

  constructor(private moviesService: Movies) {}

  ngOnInit(): void {
    this.moviesService
      .getPopularMovies()
      .subscribe((res : any) => this.movies.set(res.results.slice(0,20)));
    // this.moviesService
    // .getPopularMovies()
    // .subscribe((res: any) => {
    //   this.movies.set(res.results.slice(0, 20));
    // });
  }
}
