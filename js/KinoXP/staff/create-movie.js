
const pbSubmitMovie = document.getElementById('pbSubmitMovie');

pbSubmitMovie.addEventListener('click', createMovie);

let base64;

function createMovie(){

  const moviePoster = document.getElementById('moviePoster').files[0];
  const title = document.getElementById('title');

  const moviePromise = getBase64(moviePoster);

  moviePromise.then(function(result) {
    base64 = result;








    console.log(base64);
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
