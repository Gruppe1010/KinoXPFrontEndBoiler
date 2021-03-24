const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));
const divMoviePreview = document.getElementById('divMoviePreview');


// vi laver nu den div som skal være i a-tagget

// vi laver nu img som skal være i divMovie
let imgMovie = document.createElement('img');
imgMovie.src = selectedMovie.base64;
imgMovie.style.height = '300px';

let pTitle = document.createElement('h2');
pTitle.innerText=selectedMovie.title;
pTitle.style.fontWeight = 'bold';
pTitle.style.fontStyle = 'italic';

let pPremiere = document.createElement('p');
let premiere = selectedMovie.premiere;
pPremiere.style.fontSize='15px'
pPremiere.style.fontStyle='italic';

if (premiere == null){
  premiere = "ikke fastlagt";
}
pPremiere.innerText ="Premieredato: " + premiere;

let pYearOfRelease = document.createElement('p');
pYearOfRelease.innerText="Udgivelsesår: " + selectedMovie.yearOfRelease ;

let pLength = document.createElement('p');
pLength.innerText=selectedMovie.length + " minutter";

//TODO indsæt billeder
let pAgeLimit = document.createElement('p');
let ageLimit = selectedMovie.ageLimit;

if (ageLimit === 0){
  pAgeLimit.innerText = 'Tilladt for alle';
} else if (ageLimit === 7){
  pAgeLimit.innerText = 'Frarådes børn under 7 år';
}else{
  pAgeLimit.innerText = 'Tilladt for børn fra ' + ageLimit + ' år';
}

let aBook = document.createElement('a');
aBook.href="../customer/create-booking.html";

let pbBook = document.createElement('button');
pbBook.innerText = "Book";
//pbBook.href="../customer/create-booking.html";

divMoviePreview.appendChild(pTitle);
divMoviePreview.appendChild(imgMovie);
divMoviePreview.appendChild(pPremiere);
divMoviePreview.appendChild(pYearOfRelease);
divMoviePreview.appendChild(pLength);
divMoviePreview.appendChild(pAgeLimit);
divMoviePreview.appendChild(aBook);
aBook.appendChild(pbBook);

