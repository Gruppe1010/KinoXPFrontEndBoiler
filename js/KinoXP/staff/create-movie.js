
const pbSubmitMovie = document.getElementById('pbSubmitMovie');

pbSubmitMovie.addEventListener('click', createMovie);

let base64;

function createMovie(){

  const moviePoster = document.getElementById('moviePoster').files[0];
  const title = document.getElementById('title').value;

  const moviePromise = getBase64(moviePoster);

  moviePromise.then(function(result) {
    base64 = result;

    // TODO den skal tage alle movie-param
    const body = createJSONMovie(base64, title);

    //Vi laver nogle specifikationer til vores request
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // betyder == vi sender et json i string-format
      },
      body: body
    };

    const url = 'http://localhost:8080/movies';

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data =>  checkIfSuccess(data))
      .catch(error => console.log("error: ", error));

  });

}



function getBase64(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// TODO rediger så den tager alle params
function createJSONMovie(base64, title){

  const movie = {
    "base64": base64,
    "title": title
  }

  return JSON.stringify(movie);
}

function checkIfSuccess(data){

  if(data.id !== 0){
    console.log("succes: " + data);
  }
  else{
    console.log("error in checkIfSuccess");
  }
}









