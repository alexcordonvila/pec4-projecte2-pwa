import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie.interface';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatDivider, MatList } from '@angular/material/list';
import {MatListModule} from '@angular/material/list';
import { MovieListRow } from '../../shared/components/movie-list-row/movie-list-row';
import { MovieCard } from "../../shared/components/movie-card/movie-card";
import { MatCard, MatCardTitle, MatCardHeader } from "@angular/material/card";

@Component({
  selector: 'app-movies-list',
  imports: [MovieListRow, RouterLink, MatButtonToggleGroup, MatButtonToggle, MatIcon, MatListModule, MatDivider, MovieCard, MatCard, MatCardTitle, MatCardHeader],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  movies = signal<Movie[]>([]);
  viewMode: 'grid' | 'list' = 'list';
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
