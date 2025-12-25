import { Component, Input } from '@angular/core';
import { Movie } from '../../../models/movie.interface';
import { MatCardHeader, MatCardTitle, MatCard, MatCardSubtitle, MatCardContent } from "@angular/material/card";
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, MatCardHeader, MatCardTitle, MatCard, MatCardSubtitle, MatCardContent],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {
  @Input() movie!: Movie;

}
