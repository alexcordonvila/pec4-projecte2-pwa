import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../models/movie.interface';
import { RouterLink } from '@angular/router';
import { MatNavList, MatDivider } from "@angular/material/list";

@Component({
  selector: 'app-movie-list-row',
  imports: [RouterLink, MatNavList, MatDivider],
  templateUrl: './movie-list-row.html',
  styleUrl: './movie-list-row.scss',
})
export class MovieListRow {
  @Input() movies!: Movie[];

}
