const booking = JSON.parse(localStorage.getItem('newBooking'));
const seats = JSON.parse(localStorage.getItem('newlyBookedSeats'));
const movie = JSON.parse(localStorage.getItem('selectedMovie'));
const chosenTimeSlot = JSON.parse(localStorage.getItem('chosenTimeSlot'));
const bookingConfirmation = document.getElementById('bookingConfirmation');

console.log("booking");
console.log(booking);
console.log("seats");
console.log(seats);
console.log("movie");
console.log(movie);
console.log("chosenTimeSlot");
console.log(chosenTimeSlot);




// vi opretter elementer
// movieTitle, moviePoster, antal sæder, hvilke sæder, tidspunkt, biografsal
const h3MovieTitle = document.createElement('h2');
const moviePoster = document.createElement('img');
const h4AmountOfSeats = document.createElement('h4');
const h4BookedSeats = document.createElement('h4');
const h4TimeAndDate = document.createElement('h4');
const h4Theater = document.createElement('h4');

// vi tilføjer elementer til DOM-træ
bookingConfirmation.appendChild(h3MovieTitle);
bookingConfirmation.appendChild(moviePoster);
bookingConfirmation.appendChild(h4TimeAndDate);
bookingConfirmation.appendChild(h4AmountOfSeats);
bookingConfirmation.appendChild(h4BookedSeats);
bookingConfirmation.appendChild(h4Theater);

// vi udarbejder elementer
h3MovieTitle.innerText = movie.title;
h3MovieTitle.style.fontWeight = 'bold';
h3MovieTitle.style.fontStyle = 'italic';

moviePoster.src = movie.base64;
moviePoster.style.height = '300px';

h4AmountOfSeats.innerText = seats.length + ' biletter';

const row = chosenTimeSlot.uniqueTimeSlot.substring(27,28);
let time = '16:00';
if(row == 3){
  time = '20:00'
}


h4TimeAndDate.innerText = chosenTimeSlot.date + ' kl. ' + time + ' - Sal ' + chosenTimeSlot.uniqueTimeSlot.substring(31,32);
//h4Theater.innerText =  // year2021month03week3day4row3bio1



for (let i = 0; i < seats.length ; i++) {
  const bookedSeat = document.createElement('h5');

  const rowAndSeat = seats[i].rowAndSeat; // row3seat4
  console.log(rowAndSeat);
  const row = rowAndSeat.substring(3, 4);
  const seat = rowAndSeat.substring(8, 10);

  bookedSeat.innerText = 'Række ' + row + ' sæde ' + seat;

  h4BookedSeats.appendChild(bookedSeat);
}















