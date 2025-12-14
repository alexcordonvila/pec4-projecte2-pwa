import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../models/movie.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list-row',
  imports: [RouterLink],
  templateUrl: './movie-list-row.html',
  styleUrl: './movie-list-row.scss',
})
export class MovieListRow {
  @Input() movie!: Movie;

}
