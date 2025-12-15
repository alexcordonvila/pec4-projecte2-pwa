import { Component, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Movie } from '../../models/movie.interface';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import {
  MatCard,
} from '@angular/material/card';
import { MatNavList } from '@angular/material/list';
@Component({
  selector: 'app-movies-detail',
  imports: [
    RouterLink,
    MatIcon,
    MatCard,
    MatExpansionModule,
  ],
  templateUrl: './movies-detail.html',
  styleUrl: './movies-detail.scss',
})
export class MoviesDetail {
  movieDetail = signal<Movie>({
    id: '',
    title: '',
    original_title: '',
    overview: '',
    poster_path: '',
    backdrop_path: '',
    release_date: '',
    runtime: 0,
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    adult: false,
    original_language: '',
    genre_ids: [],
  });
  constructor(
    private moviesService: Movies,
    //Para leer params de la url
    private activateRoute: ActivatedRoute,
    // Para redireccionar a una vista determinada si no tenemos un id válido
    private router: Router
  ) {}

  ngOnInit(): void {
    const identifier = this.activateRoute.snapshot.paramMap.get('id');
    console.log('Identifier -->', identifier);

    if (identifier) {
      this.moviesService.getMovieById(identifier).subscribe((mov) => {
        if (!mov) {
          this.router.navigateByUrl('/');
        }
        this.movieDetail.set(mov);
        console.log('movieDetail -->', this.movieDetail());
      });
    }
  }
}
