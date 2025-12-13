# pec4-projecte2-pwa


Ejemplo de Api query:
https://api.themoviedb.org/3/movie/popular?api_key=b635b3689ba85c14117e14ed8e84d952&language=es-ES


https://api.themoviedb.org/3/movie/550??api_key=b635b3689ba85c14117e14ed8e84d952&language=es-ES



# Ús del servei Movies amb TMDb

Hem creat un servei Angular que obté les **pel·lícules populars** de l'API de **The Movie Database (TMDb)**.  

Hem creat un interface per Movie i un altre per la response de l'api MovieResponse.
## Mètode utilitzat

- **Mètode 2:** Mapatge directe a `Movie[]` al servei.  
  - L'API original retorna un objecte amb paginació (`{ page, results, total_pages, total_results }`).  
  - Amb l'operador `map` de RxJS, extraiem només l'array `results` i opcionalment agafem les **primeres 20 pel·lícules**.  
  - Això fa que el **component pugui treballar directament amb un array de `Movie`** i no calgui accedir a `res.results` cada vegada.

## Exemple de codi del servei

```ts
getPopularMovies(): Observable<Movie[]> {
  return this.http.get<MovieResponse>(
    `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES`
  ).pipe(
    map(res => res.results.slice(0, 20))
  );
}





#Estrategia de compo