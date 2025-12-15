import { Component, OnInit, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie.interface';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MovieListRow } from '../../shared/components/movie-list-row/movie-list-row';
import { MatCard, MatCardTitle, MatCardHeader } from "@angular/material/card";
import { Grid } from "../../shared/components/grid/grid";

@Component({
  selector: 'app-movies-list',
  imports: [MovieListRow, MatButtonToggleGroup, MatButtonToggle, MatIcon, MatListModule, MatCard, MatCardTitle, MatCardHeader, Grid],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  movies = signal<Movie[]>([]);
  viewMode: 'grid' | 'list' = 'grid';
  constructor(private moviesService: Movies) {}

  ngOnInit(): void {
    // this.moviesService
    //   .getPopularMovies()
    //   .subscribe((res : any) => this.movies.set(res));
    this.moviesService
    .getPopularMovies()
    .subscribe((res: any) => {
      this.movies.set(res);
      console.log(res);
    });
  }
}
