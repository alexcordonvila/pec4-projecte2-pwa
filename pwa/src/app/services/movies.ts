import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie.interface';
@Injectable({
  providedIn: 'root'
})
export class Movies{

  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = 'b635b3689ba85c14117e14ed8e84d952';

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES`);
  }

  getTopRatedMovies() {
    return this.http.get(`${this.baseUrl}/movie/top_rated?api_key=${this.apiKey}&language=es-ES`);
  }

  getTrendingMovies() {
    return this.http.get(`${this.baseUrl}/trending/movie/week?api_key=${this.apiKey}&language=es-ES`);
  }
}
