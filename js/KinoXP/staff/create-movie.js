

const pbSubmitMovie = document.getElementById('pbSubmitMovie');

pbSubmitMovie.addEventListener('click', createMovie);

let base64;

function createMovie(){

  const moviePoster = document.getElementById('moviePoster').files[0];
  const title = document.getElementById('title');

  base64 = getBase64(moviePoster);


// hej

}

console.log(base64);

function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {return reader.result;};
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

/*

var file = document.querySelector('#files > input[type="file"]').files[0];
getBase64(file); // prints the base64 string








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



 */
