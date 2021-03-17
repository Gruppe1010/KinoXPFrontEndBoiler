const url =  'http://localhost:8080/movies';
const divMovies = document.getElementById('divMovies');

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



  }
  else{

    console.log("der er ikke nogen movies");

    let h1NoMovies = document.createElement('h1');
    let h1NoMoviesNode = document.createTextNode("Der er bare ikke nogen film mand");
    h1NoMovies.appendChild(h1NoMoviesNode);
    divMovies.appendChild(h1NoMovies);

  }
}






