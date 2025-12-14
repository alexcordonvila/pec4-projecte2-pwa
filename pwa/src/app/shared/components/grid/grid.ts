import { Component, Input } from '@angular/core';
import { MovieCard } from "../movie-card/movie-card";
import { Movie } from '../../../models/movie.interface';

@Component({
  selector: 'app-grid',
  imports: [MovieCard],
  templateUrl: './grid.html',
  styleUrl: './grid.scss',
})
export class Grid {
@Input() movies!: Movie[];
}
