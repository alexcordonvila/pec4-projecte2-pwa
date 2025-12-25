# pec4-projecte2-pwa
Per resoldre aquest exercici, s’ha decidit enfocar l’aplicació en l’àmbit del cinema. L’aplicació mostra les 20 pel·lícules més recents, amb informació detallada i contingut rellevant, obtinguts a través de l’API de The Movie Database (TMDb).

# Projecte desplegat

En aquest enllaç es pot accedir a la app desplegada a Github pages:

🔗 [App PWA Exercici 2](https://alexcordonvila.github.io/pec4-projecte2-pwa/movies)


# Ús del servei Movies amb TMDb

Hem creat un servei Angular que obté les **pel·lícules populars** de l'API de **The Movie Database (TMDb)**.  

Hem creat un interface per Movie i un altre per la response de l'api MovieResponse.
## Mètode utilitzat
Mapatge directe a `Movie[]` al servei:  
  - L'API original retorna un objecte amb paginació (`{ page, results, total_pages, total_results }`).  
  - Amb l'operador `map` de RxJS, extraiem només l'array `results` i agafem les **primeres 20 pel·lícules**.  
  - Això fa que el **component pugui treballar directament amb un array de `Movie`** i no calgui accedir a `res.results` cada vegada.

## Exemple de codi del servei:

```ts
getPopularMovies(): Observable<Movie[]> {
  return this.http.get<MovieResponse>(
    `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES`
  ).pipe(
    map(res => res.results.slice(0, 20))
  );
}
```

Exemple de Api query amb el nostre Api Key de test:
- https://api.themoviedb.org/3/movie/popular?api_key=b635b3689ba85c14117e14ed8e84d952&language=es-ES
- https://api.themoviedb.org/3/movie/550?api_key=b635b3689ba85c14117e14ed8e84d952&language=es-ES

En un entorn de producció no podem tenir la api key *hardcoded*, podriem crear un servei api on l'app demani les dades per carregar com per exemple: Frontend App (GitHub Pages) ---> Backend (Vercel/Netlify) ---> TMDb API

# Hem creat components compartits per tenir el codi més net
ng generate component shared/components/movie-card --standalone
ng generate component shared/components/movie-list-row --standalone
ng generate component shared/components/grid --standalone

Per aquesta app utilitzem angular material animations des d'un fitxer intern i la API "The movie database".

# Estratègia de Cache de la PWA - The Movie Database

Aquest apartat explica com funciona la **PWA amb TMDb** i quina estratègia de cache utilitza per les dades i recursos.

Dins del ngsw hem configurat el seguent:

## 1. Grups d’Assets (`assetGroups`)

### a) Al grup `app`

- Hi ha els fitxers base per carregar l’aplicació:
  - `index.html`, `manifest.webmanifest`, `favicon.ico`
  - Fitxers CSS i JS locals (`/*.css`, `/*.js`)
  - `assets/css/animate.css` (animacions)
  - Libreries externes:
    - Bootstrap
    - Fonts de Google (`Roboto`)
    - Material Icons
- **`installMode: prefetch`**:
  - Es descarrega **tot immediatament** quan s’instal·la la PWA.
  - Permet que la app funcioni **offline** i carregui ràpid.
  
### b) Als `assets`

- Conté recursos no crítics com:
  - Imatges locals (`svg`, `jpg`, `png`, etc.)
  - Fonts locals (`woff`, `ttf`, etc.)
- **`installMode: lazy`**:
  - Es descarrega **només quan es necessiten**.
  - Redueix el pes inicial de la PWA.

## 2. Al (`dataGroups`)

### a) API de TMDb (`movies-api`)

- URL cachejada: `https://api.themoviedb.org/3/**`
- **`strategy: freshness`**:
  - Primer intenta **anar a internet** per obtenir les dades més recents.
  - Si internet  **triga més de 2 segons**, utilitza la **caché**.
- **`maxAge: 1h`**:
  - Les dades es consideren caducades després d’1 hora i es tornen a actualitzar.
- Es considera bona estratègia per contingut que pot canviar sovint.

### b) Imatges de TMDb (`movies-images`)

- URL cachejada: `https://image.tmdb.org/t/p/**`
- **`strategy: performance`**:
  - Primer mostra la **caché** per càrrega ràpida.
  - Actualitza les imatges en **segon pla**.
- **`maxAge: 7d`**:
  - Les imatges es mantenen en caché fins a 7 dies.
- **`maxSize: 300`**:
  - Només es guarden les 300 últimes imatges.
- Ens permet que **posters i fons** carreguin ràpid i estiguin disponibles offline.

## 3. Resum del Flux

1. **Instal·lació de la PWA**:
   - Fitxers crítics i llibreries externes descarregats amb `prefetch`.
2. **Ús de la app offline**:
   - CSS, fonts i icones ja disponibles al caché.
3. **Dades de l’API**:
   - Sempre intenta obtenir dades fresques i si falla, utilitza el caché recent.
4. **Imatges de The Mmovie Db**:
   - Carreguen ràpidament des del caché i s’actualitzen en segon pla.

Amb aquest sistema tenim:
- Càrrega ràpida de l’aplicació.
- Funcionament **offline** gairebé complet.
- Experiència visual **fluida** amb posters i fons disponibles sense esperar la xarxa.

S'ha aplicat un spinner de càrrega i animacións quan es carreguen la llista, les cards i la pàgina de detall de la pel·lícula.

Malgrat tenir tot això encara ens faltaria que, si no tenim internet i no tenim les dades cachejades, hauriem de carregar una vista informant que no s'ha pogut carregar i mostrar una UI solida controlant que la api no ens dona una llista de pel·lícules.