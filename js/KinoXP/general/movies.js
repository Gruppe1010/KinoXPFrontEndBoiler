const url =  'http://localhost:8080/movies';

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
  .then(data => showMovies(data))
  .catch(error => console.log("error: ", error));


function showMovies(data){
  // TODO Denne skal laves - hvis length == 0 så noget
  if(data.id !== 0){
    console.log("succes: ", data)


  }
  else{
    alert("Log ind fejlede, prøv igen");
  }
}






