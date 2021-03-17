const url =  'http://localhost:8080/movies';
const divMovies = document.getElementById('divMovies');
let currentRow;

/*
const requestOptions = {
  method: 'GET',
  headers: {
    'content-type': 'application/json' // betyder == vi sender et json i string-format
  },
  redirect: 'follow',
  mode:'no-cors'
};

 */

fetch(url)
  .then(response => response.json())
  .then(movies => showMovies(movies))
  .catch(error => console.log("error: ", error));


function showMovies(movies){
  // Hvis der ER film
  if(movies.length !== 0){
    console.log("succes: ", movies)

    currentRow = createRow();






  }
  else{

    console.log("der er ikke nogen movies");

    let h1NoMovies = document.createElement('h1');
    let h1NoMoviesNode = document.createTextNode("Der er bare ikke nogen film mand");
    h1NoMovies.appendChild(h1NoMoviesNode);
    divMovies.appendChild(h1NoMovies);

  }
}

function createRow(){

  let newRow = document.createElement('div');
  newRow.classList.add('row');

  return newRow;
}

function createMoviePreview(movie){
  /* Elementet vi laver:
  * <a href="../../general/view-movie.html"> <!-- function createMoviePreview(movie) -->
      <div class="col-sm-3">
        <img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%" alt="Image">
        <br>
        <p>Titel</p>
        <p>Premieredato</p>
      </div>
    </a>
  *
  * */

  // vi laver nu a-tagget - giver det en href og et id
  let aMovie = document.createElement('a');
  aMovie.href = '../../general/view-movie.html';
  aMovie.setAttribute('id', movie.id);

  // vi laver nu den div som skal være i a-tagget
  let divMovie = document.createElement('div');
  divMovie.classList.add('col-sm-3');

  // vi laver nu img som skal være i divMovie
  let imgMovie = document.createElement('img');
  imgMovie.src = 'Todo';


}















