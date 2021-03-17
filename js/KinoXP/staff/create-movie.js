

const pbSubmitMovie = document.getElementById('pbSubmitMovie');

pbSubmitMovie.addEventListener('click', createMovie);



function createMovie(){

  const moviePoster = document.getElementById('moviePoster');
  const title = document.getElementById('title');


  const movieDataUrl = moviePoster.toDataURL();

  base64








}













document.getElementById('upload').addEventListener('change', showImage);

function showImage(evt) {
  var files = evt.target.files;

  if (files.length === 0) {
    console.log('No files selected');
    return;
  }

  var reader = new FileReader();
  reader.onload = function(event) {
    var img = new Image();
    img.onload = function() {
      document.body.appendChild(img);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(files[0]);
}


