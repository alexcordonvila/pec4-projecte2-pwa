# pec4-projecte2-pwa

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

Dubte: La nostra api key s'ha d'encriptar d'alguna manera?


Ejemplo de Api query:
https://api.themoviedb.org/3/movie/popular?api_key=b635b3689ba85c14117e14ed8e84d952&language=es-ES


https://api.themoviedb.org/3/movie/550??api_key=b635b3689ba85c14117e14ed8e84d952&language=es-ES



#Estrategia de sistema PWA 

Dubtes inicials: Quina de les llibreries depen d'internet i quina no? Si depen d'internet podem fer alguna cosa per manterir les dades carregades? Si no hi ha dades carregades i no hi ha internet?


Per aquesta app utilitzem angular material animations des d'un fitxer intern i la API "The movie database"

Si no tenim internet hauriem de carregar una vista informant que no s'ha pogut carregar res i mostrar una UI solida controlant que la api no ens dona una llista de pel·lícules.

Problema: MatIcon no carrega la icona sense conexió -> solució1: npm install material-icons e importar-ho en angular.json per servir icones des de l'app. 

solució 2: usar CDN pero el service worker fa el caching per a que el navegador la serveixi des de caché (Angular-way)