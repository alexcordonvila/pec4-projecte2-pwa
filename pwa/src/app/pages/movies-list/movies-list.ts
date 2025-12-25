import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { Movie } from '../../models/movie.interface';
import { MatButtonToggleGroup, MatButtonToggle } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MovieListRow } from '../../shared/components/movie-list-row/movie-list-row';
import { MatCard, MatCardTitle, MatCardHeader } from "@angular/material/card";
import { Grid } from "../../shared/components/grid/grid";
import { finalize } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movies-list',
  imports: [MovieListRow, MatButtonToggleGroup, MatButtonToggle, MatIcon, MatListModule, MatCard, MatCardTitle, MatCardHeader, Grid,MatProgressSpinnerModule],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss',
})
export class MoviesList implements OnInit {
  movies = signal<Movie[]>([]);
  loading = false;

  viewMode: 'grid' | 'list' = 'grid';
  constructor(private moviesService: Movies, private cdr: ChangeDetectorRef) {}

  
ngOnInit(): void {
  this.loading = true;

  this.moviesService.getPopularMovies()
    .pipe(finalize(() =>{
this.loading = false;
console.log("Se cierra el spinner");
this.cdr.detectChanges();
    } ))
    .subscribe({
      next: (res: Movie[]) => this.movies.set(res),
      error: (err) => console.error(err)
    });
}
}
