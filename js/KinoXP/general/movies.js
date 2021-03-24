const url =  'http://localhost:8080/movies';
const divRow = document.getElementById('divRow');
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
  .then(movies => movies.forEach(showMovies))
  .catch(error => console.log("error: ", error));


function showMovies(movie){

  // Hvis der ER film

  createMoviePreview(movie);
  // TODO muligvis kommenter denne ind igen
 /* if(movie.length !== 0){

    createMoviePreview(movie);
  }
  else{

    console.log("der er ikke nogen movies");

    let h1NoMovies = document.createElement('h1');
    let h1NoMoviesNode = document.createTextNode("Der er bare ikke nogen film mand");
    h1NoMovies.appendChild(h1NoMoviesNode);
    divMovies.appendChild(h1NoMovies);

  }

  */
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
  *
  *
  * */

  //TODO HER ER DER FEEEEJL
  // vi laver nu a-tagget - giver det en href og et id
  let aMovie = document.createElement('a');
  aMovie.href = '../general/view-movie.html';
  aMovie.setAttribute('id', movie.id);
  aMovie.addEventListener('click', addMovieToLocalStorage);

  function addMovieToLocalStorage(){
    localStorage.setItem('selectedMovie', JSON.stringify(movie));

  }

  // vi laver nu den div som skal være i a-tagget
  let divMovie = document.createElement('div');
  divMovie.classList.add('col-sm-2');
  divMovie.align = "center";
  divMovie.style.width='80%';
  divMovie.style.maxHeight= '295px';
  divMovie.style.maxWidth= '200px';


  // vi laver nu img som skal være i divMovie
  let imgMovie = document.createElement('img');
  imgMovie.src = movie.base64;

  let pTitle = document.createElement('p');
  pTitle.innerText=movie.title;
  pTitle.style.fontWeight='bolder';
  pTitle.style.fontSize='25px';

  let pPremiere = document.createElement('p');
  let premiere = movie.premiere;
  pPremiere.style.fontSize='15px'
  pPremiere.style.fontStyle='italic';

  if (premiere == null){
    premiere = "Premieredato ikke fastlagt";
  }
  pPremiere.innerText = premiere;

  imgMovie.classList.add('img-responsive');
  imgMovie.style.width='80%';
  imgMovie.style.maxHeight= '295px';
  imgMovie.style.maxWidth= '200px';

  divRow.appendChild(aMovie);
  aMovie.appendChild(divMovie);
  divMovie.appendChild(imgMovie);
  divMovie.appendChild(document.createElement('br'));
  divMovie.appendChild(pTitle);
  divMovie.appendChild(pPremiere);



}






















