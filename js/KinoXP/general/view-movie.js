const movie = JSON.parse(localStorage.getItem('selectedMovie'));
const divMoviePreview = document.getElementById('divMoviePreview');


// vi laver nu den div som skal være i a-tagget

// vi laver nu img som skal være i divMovie
let imgMovie = document.createElement('img');
imgMovie.src = movie.base64;

let pTitle = document.createElement('p');
pTitle.innerText=movie.title;
pTitle.style.fontWeight='bolder';
pTitle.style.fontSize='25px';

let pPremiere = document.createElement('p');
let premiere =movie.premiere;
pPremiere.style.fontSize='15px'
pPremiere.style.fontStyle='italic';

if (premiere == null){
  premiere = "ikke fastlagt";
}
pPremiere.innerText ="Premieredato: " + premiere;

let pYearOfRelease = document.createElement('p');
pYearOfRelease.innerText="Udgivelsesår: " + movie.yearOfRelease ;

let pLength = document.createElement('p');
pLength.innerText=movie.length + " minutter";

//TODO indsæt billeder
let pAgeLimit = document.createElement('p');
pAgeLimit.innerText=movie.ageLimit;

let aBook = document.createElement('a');
aBook.href="../customer/create-booking.html";

let pbBook = document.createElement('button');
pbBook.innerText = "Book";
//pbBook.href="../customer/create-booking.html";

aBook.appendChild(pbBook);
divMoviePreview.appendChild(imgMovie);
divMoviePreview.appendChild(pTitle);
divMoviePreview.appendChild(pPremiere);
divMoviePreview.appendChild(pYearOfRelease);
divMoviePreview.appendChild(pLength);
divMoviePreview.appendChild(pAgeLimit);
divMoviePreview.appendChild(aBook);

