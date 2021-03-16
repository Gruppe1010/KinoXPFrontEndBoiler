const url =  "http://localhost:8080/movies";

const requestOptions = {
  method: 'GET',
  headers: {
    'content-type': 'application/json' // betyder == vi sender et json i string-format
  },
  redirect: 'follow',
  mode:'no-cors'
};

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log("error: ", error));


function print(data){
  const movies = data.map(dd => dd.data); // nu har vi en collection af addresse-obj i addressMap


  let movieArray = [];

  // nu piller vi vejnavnene ud i en NY collection
  movieArray = movies.map(movie => movie.title);

  console.log(movieArray);
}

function checkIfSuccess(data){
  if(data.id !== 0){
    console.log("succes: ", data)


  }
  else{
    alert("Log ind fejlede, prøv igen");
  }
}






