
const pbSubmitMovie = document.getElementById('pbSubmitMovie');

pbSubmitMovie.addEventListener('click', createMovie);

let base64;

/*


    <label htmlFor="length">Længde i minutter</label>

      <label htmlFor="premiere">Premieredato</label>
        <label htmlFor="yearOfRelease">Udkommelsesår</label>

          <!-- radio button-->
          <label htmlFor="ageLimit1">Tilladt for alle</label>

 */


function createMovie(){

  const moviePoster = document.getElementById('moviePoster').files[0];
  const title = document.getElementById('title').value;

  const length = document.getElementById('length').value;
  const premiere = document.getElementById('premiere').value;
  const yearOfRelease = document.getElementById('yearOfRelease').value;
  const ageLimit = document.querySelectorAll("input[name=ageLimit]:checked")[0].value;

  console.log("premiere: " + premiere);





  /*
  if (document.getElementById('r1').checked) {
    rate_value = document.getElementById('r1').value;
  }

   */

  console.log("ageLimit: " + ageLimit);



  const moviePromise = getBase64(moviePoster);

  moviePromise.then(function(result) {
    base64 = result;

    // TODO den skal tage alle movie-param
    const body = createJSONMovie(base64, title, length, premiere, yearOfRelease, ageLimit);

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


/* metode fundet på:
*
* https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
* */
function getBase64(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// TODO rediger så den tager alle params
function createJSONMovie(base64, title, length, premiere, yearOfRelease, ageLimit){

  const movie = {
    'base64': base64,
    'title': title,
    'length': length,
    'premiereDate': premiere,
    'yearOfRelease': yearOfRelease,
    'ageLimit': ageLimit,
    'active': true
  }

  console.log(ageLimit);

  return JSON.stringify(movie);
}

function checkIfSuccess(data){

  if(data.id !== 0){
    console.log("succes: " + data);
    alert("Filmen " + data.title + " er nu oprettet succesfuldt");
  }
  else{
    alert("Der skete en fejl");
  }
}









