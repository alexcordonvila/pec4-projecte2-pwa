import { Routes } from '@angular/router';
import { MoviesDetail } from './pages/movies-detail/movies-detail';
import { MoviesList } from './pages/movies-list/movies-list';

export const routes: Routes = [
    {path: '', redirectTo: 'movies', pathMatch: 'full'},
    {path: 'movies', component: MoviesList},
    {path: 'movies/:id', component: MoviesDetail},
    


];
