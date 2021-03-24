const testMovie = JSON.parse(localStorage.getItem('selectedMovie'));
const title = document.getElementById('title');

let day;// TODO overvej at skære fra
let month;
let year;
let firstDayOfMonth;
let numberOfDaysInMonth;
let today = new Date();
let bookedTimeSlots = [];
let chosenTimeSlot;

let bookedSeats = [];
let chosenSeats = [];
let filteredChosenSeats = [];
let amountOfChosenSeats = 0;

const findNumberOfDaysInMonth = function(month,year) {
  return new Date(year, month, 0).getDate();
};

const divCalendar = document.getElementById('divCalendar');

generateCalendar();

// ------------------FØRSTE VIEW: VÆLG SPILLETID

// Laver HELE kalenderen - kalder alle andre funktioner
function generateCalendar(){
  divCalendar.innerHTML = "";

  // vi sætter alle date-variabler som er oprettet ovenfor
  setDateInfo(today);

  // her henter vi alle de bookede film for måneden
  getBookedTimeSlots();

  changeMonth();
  createCalendar();
}

// Henter alle de bookede film for måneden i det gældende år
// tilføjer uniqueTimeSlot-strings til bookedTimeSlots-Set
function getBookedTimeSlots(){

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // betyder == vi sender et json i string-format
    }
  };

  const url = `http://localhost:8080/unique-time-slots/id-movie/${testMovie.id}`;

  console.log(url);

  fetch(url, requestOptions)
    .then(response => response.json())
    // vi henter stringværdierne på attributten uniqueTimeSlot ud og tilføjer dem til bookedTimeslots
    .then(uniqueTimeSlots => bookedTimeSlots = uniqueTimeSlots)
    // .then(test => bookedTimeSlots = bookedTimeSlotElements.map(x => x.uniqueTimeSlot))  TODO overvej at slette - vi henter ikke kun strings ud mere, men hele elementer
    .then(addDatesToCalendar)
    .catch(error => console.log("error: ", error));
}

// sætter alle date-attributter
function setDateInfo(today) {
  day = today.getDate();
  month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  year = today.getFullYear();

  firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  // Da det er i USA er søndag ugen starter bliver søndag evalueret til 0.
  if(firstDayOfMonth === 0){
    firstDayOfMonth = 7;
  }
  numberOfDaysInMonth = findNumberOfDaysInMonth(month, year);
}

// Opretter alle celler i tabellen
function createCalendar(){
  const table = document.createElement('TABLE');
  table.border = '1';

  const tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  const headlineRow = document.createElement('TR');
  headlineRow.setAttribute('id', 'headlineRow');

  const monday = createDayElements('monday', 'Mandag');
  const tuesday = createDayElements('tuesday', 'Tirsdag');
  const wednesday = createDayElements('wednesday', 'Onsdag');
  const thursday = createDayElements('thursday', 'Torsdag');
  const friday = createDayElements('friday', 'Fredag');
  const saturday = createDayElements('saturday', 'Lørdag');
  const sunday = createDayElements('sunday', 'Søndag');


  function createDayElements(idDay, innerTextDay){
    const dayElement = document.createElement('TH');
    dayElement.setAttribute('id', idDay);
    dayElement.innerText = innerTextDay;
    dayElement.style.backgroundColor = '#a0a09d';
    dayElement.style.width = "150px";

    return dayElement;
  }

  headlineRow.appendChild(monday);
  headlineRow.appendChild(tuesday);
  headlineRow.appendChild(wednesday);
  headlineRow.appendChild(thursday);
  headlineRow.appendChild(friday);
  headlineRow.appendChild(saturday);
  headlineRow.appendChild(sunday);
  tableBody.appendChild(headlineRow)


  /*
  <table border="1">
    <tbody>

    <td>
      <tr>
        <td colspan="2">hrj</td>
      </tr>
      <tr>
        <td>123</td>
        <td>123</td>
      </tr>
      <tr>
        <td>123</td>
        <td>123</td>
      </tr>
      <tr>
        <td>123</td>
        <td>123</td>
      </tr>

    </td>
    </tbody>
  </table>
  */

  for(let i = 1; i <=6; i++){
    const week = document.createElement('TR');
    week.setAttribute('id', 'week' + i);

    tableBody.appendChild(week);

    for(let j = 1; j <= 7; j++){
      const day = document.createElement('TD');
      day.setAttribute('id', 'week' + i + 'day' + j);

      const date = document.createElement('TR');
      // week1day6date
      date.setAttribute('id', 'week' + i + 'day' + j + 'date');
      date.setAttribute('colspan', '2');
      date.width = '100%'
      date.style.fontWeight = 'bold';
      date.style.fontSize = '15px';

      day.appendChild(date);

      for(let k = 1; k <= 3; k++){
        const row = document.createElement('TR');
        row.setAttribute('id', 'week' + i + 'day' + j + 'row' + k);


        day.appendChild(row);

        for(let l = 1; l <= 2; l++){
          const bio = document.createElement('TD');
          bio.setAttribute('id', 'week' + i + 'day' + j + 'row' + k + 'bio' + l);


          row.appendChild(bio)
        }
      }
      week.appendChild(day);
    }
  }
  divCalendar.appendChild(table);
  divCalendar.appendChild(document.createElement('br'));

}

// tilføjer ALT indhold til cellerne
function addDatesToCalendar(){

  let innerTextDate = 0;

  // for-loop for den første kalenderuge
  // fordi d. 1. måske er en onsdag
  for(let i = 0; i <= 7 - firstDayOfMonth; i++) {

    let dayNumber = firstDayOfMonth + i;

    const td = document.getElementById('week1day' + dayNumber + 'date');
    innerTextDate++;

    td.innerText = innerTextDate;

    addBioNumber(1, dayNumber);
    addBioTimeSlots(1, dayNumber);
  }
  // resten af ugerne i kalenderen
  // for-loop for ugenr
  for(let i = 2; i <=6; i++){
    // for-loop hvor j er dayNumber
    for(let j = 0; j < 7; j++) {

      innerTextDate++;

      if(innerTextDate <= numberOfDaysInMonth){

        let dayNumber = 1 + j;

        const td = document.getElementById('week' + i + 'day' + dayNumber + 'date');

        td.innerText = innerTextDate;

        addBioNumber(i, dayNumber);
        addBioTimeSlots(i, dayNumber);
      }
    }
  }

// tilføjer teksterne "Bio 1" og "Bio 2"
  function addBioNumber(weekNumber, dayNumber){
    const tdBio1 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'row1bio' + 1);
    const tdBio2 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'row1bio' + 2);

    tdBio1.innerText = " Bio 1 ";
    tdBio2.innerText = " Bio 2 ";

    // vi tilføjer grå baggrundsfarve på bio-felter
    tdBio1.style.backgroundColor = '#dddada';
    tdBio2.style.backgroundColor = '#dddada';
    tdBio1.style.width = "75px";
    tdBio2.style.width = "75px";

  }

  // tilføjer tidspunkterne 16-19 og 20-23 i de 4 tidspunktsceller i ÉN dagsfirkant
  function addBioTimeSlots(weekNumber, dayNumber){
    // vi laver id-Strings til hver celle
    const timeSlot1Id = 'week' + weekNumber + 'day' + dayNumber + 'row2bio' + 1;
    const timeSlot2Id = 'week' + weekNumber + 'day' + dayNumber + 'row2bio' + 2;
    const timeSlot3Id = 'week' + weekNumber + 'day' + dayNumber + 'row3bio' + 1;
    const timeSlot4Id = 'week' + weekNumber + 'day' + dayNumber + 'row3bio' + 2;

    // vi hiver fat i de 4 elementer ud fra id-Stringsne
    const tdBio1TimeSlot1 = document.getElementById(timeSlot1Id);
    const tdBio2TimeSlot1 = document.getElementById(timeSlot2Id);
    const tdBio1TimeSlot2 = document.getElementById(timeSlot3Id);
    const tdBio2TimeSlot2 = document.getElementById(timeSlot4Id);

    // vi sætter tidspunktet
    tdBio1TimeSlot1.innerText = "16:00";
    tdBio2TimeSlot1.innerText = "16:00";
    tdBio1TimeSlot2.innerText = "20:00";
    tdBio2TimeSlot2.innerText = "20:00";

    tdBio1TimeSlot1.style.height = "35px";
    tdBio2TimeSlot1.style.height = "35px";
    tdBio1TimeSlot2.style.height = "35px";
    tdBio2TimeSlot2.style.height = "35px";


    setBookedTimeSlotsToRedAndBlue(timeSlot1Id, tdBio1TimeSlot1);
    setBookedTimeSlotsToRedAndBlue(timeSlot2Id, tdBio2TimeSlot1);
    setBookedTimeSlotsToRedAndBlue(timeSlot3Id, tdBio1TimeSlot2);
    setBookedTimeSlotsToRedAndBlue(timeSlot4Id, tdBio2TimeSlot2);

    function setBookedTimeSlotsToRedAndBlue(timeSlotId, timeSlotElement){
      // Det er denne variabel som indgår i UniqueTimeSlot-klassen som attribut
      // year2021month3week1day3row2bio1;
      const uniqueTimeSlot = 'year' + year + 'month' + month + timeSlotId;

      // Vi sætter afspillingstidspunkerne til at være grønne!!!!!! - vi skal altså se om hvert timeSlot-felt ER på vores bookedTimeSlotElements-liste
      // bookedTimeSlotElements == liste med alle vores UniqueTimeSlot-objekter på tilhørende movie
      // filter(x => x.uniqueTimeSlot == uniqueTimeSlot) == vi sorterer alle fra som IKKE er lige uniqueTimeSlot-stringen
      // dette bør efterlade os med én, hvis den er der
      let timeSlotElementThatMatches = bookedTimeSlots.filter(x => x.uniqueTimeSlot == uniqueTimeSlot);

      // Her sætter vi de bookede tidspunker til rød og tilføjer en eventListener på alle andre felter
      if(timeSlotElementThatMatches.length > 0) {
        timeSlotElement.style.backgroundColor = '#21f683';
        // vi tilføjer en eventListener på alle optagede tidsceller
        timeSlotElement.addEventListener('click', chooseTimeSlot);
      }

      // vi sætter chosenTimeSlot-variablen til at være det uniqueTimeSlot som brugeren har valgt på kalenderen
      function chooseTimeSlot(){

        chosenTimeSlot = timeSlotElementThatMatches[0];

        generateSeatsTable();
      }
    }
  }
}

// skift måned knapperne
function changeMonth(){
  //Opretter elementerne
  const divMonth = document.createElement('div');
  const pbPreviousMonth = document.createElement('button');
  const selectedMonth = document.createElement('h1');
  const selectedYear = document.createElement('h1');
  const pbNextMonth = document.createElement('button');

  //Tilføjer elementerne
  divCalendar.appendChild(divMonth);
  divMonth.appendChild(selectedYear);
  divMonth.appendChild(pbPreviousMonth);
  divMonth.appendChild(selectedMonth);
  divMonth.appendChild(pbNextMonth);
  divCalendar.appendChild(document.createElement('br'));

  //Udarbejder elementerne
  pbPreviousMonth.setAttribute('id', 'previousMonth');
  pbPreviousMonth.innerHTML = '&#11164; forrige måned';
  pbPreviousMonth.style.display = 'inline';
  pbPreviousMonth.style.backgroundColor = '#dddada';


  pbNextMonth.setAttribute('id', 'nextMonth');
  pbNextMonth.innerHTML = "næste måned &#11166;"
  pbNextMonth.style.display = 'inline';
  pbNextMonth.style.backgroundColor = '#dddada';

  selectedMonth.setAttribute('id', 'selectedMonth');
  selectedMonth.style.display = 'inline';
  selectedMonth.style.padding = '25px';


  selectedYear.setAttribute('id', 'selectedYear');
  selectedYear.innerText = year;
  selectedYear.style.marginRight = '1000px';
  selectedYear.style.fontStyle = 'italic';



  pbPreviousMonth.addEventListener('click', previousMonth);
  pbNextMonth.addEventListener('click', nextMonth);

  // 01-09 er lavet som strings, fordi vi manuelt tilføjer et 0 længere oppe hvis måneden < 10
  // derfor bliver den lavet om til en string, mens hvis den er over 10 er det stadig en int
  if(month === '01'){
    selectedMonth.innerText = "Januar";
  }else if (month === '02'){
    selectedMonth.innerText = "Februar";
  }else if (month === '03'){
    selectedMonth.innerText = "Marts";
  }else if (month === '04'){
    selectedMonth.innerText = "April";
  }else if (month === '05'){
    selectedMonth.innerText = "Maj";
  }else if (month === '06'){
    selectedMonth.innerText = "Juni";
  }else if (month === '07'){
    selectedMonth.innerText = "Juli";
  }else if (month === '08'){
    selectedMonth.innerText = "August";
  }else if (month === '09'){
    selectedMonth.innerText = "September";
  }else if (month === 10){
    selectedMonth.innerText = "Oktober";
  }else if (month === 11){
    selectedMonth.innerText = "November";
  }else if (month === 12){
    selectedMonth.innerText = "December";
  }

  function previousMonth(){
    today.setMonth(today.getMonth() - 1);
    generateCalendar();
  }

  function nextMonth(){
    today.setMonth(today.getMonth() + 1);
    generateCalendar();
  }
}




// ------------------ANDET VIEW: VÆLG SÆDER


// opretter biograf med sæder
function generateSeatsTable(){
  divCalendar.innerHTML = "";
  title.innerText = "Vælg sæder";

  // den fetcher alle de bookede sæder og kalder derefter createTheater-funktionen, som opretter biograf-viewet
  getBookedSeats();



}

function getBookedSeats(){

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // betyder == vi sender et json i string-format
    }
  };

  const url = `http://localhost:8080/seats/id-unique-time-slot/${chosenTimeSlot.id}`;

  fetch(url, requestOptions)
    .then(response => response.json())
    // vi henter stringværdierne på attributten uniqueTimeSlot ud og tilføjer dem til bookedTimeslots
    .then(seats => bookedSeats = seats)
    .then(createTheater)
    .catch(error => console.log("error: ", error));
}

function createTheater(){
  // vi henter det bagerste tal på  uniqueTimeSlot-stringen ud fordi det er bio1 eller bio2
  const theaterNo = chosenTimeSlot.uniqueTimeSlot.substring(31, 32);
  let rows;
  let seatsPrRow;

  if(theaterNo == 1){
    rows = 20;
    seatsPrRow = 12;
  }
  else {
    rows = 25;
    seatsPrRow = 16;
  }

  const h4AmountOfChosenSeats = document.createElement('h4');
  h4AmountOfChosenSeats.innerText = 'Du har valgt 0 sæder';

  const btnSubmit = document.createElement('button');
  btnSubmit.setAttribute('id', 'btnSubmit');
  btnSubmit.addEventListener('click', bookChosenSeats);
  btnSubmit.innerText = "Book";
  btnSubmit.style.backgroundColor = '#c1f3ba';

  const table = document.createElement('TABLE');
  //table.border = '1';

  const tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for(let i = 1; i <= rows; i++){
    const row = document.createElement('TR');
    row.setAttribute('id', 'row' + i);

    tableBody.appendChild(row);

    for(let j = 1; j <= seatsPrRow; j++){
      const seat = document.createElement('TD');

      const uniqueSeatId = 'row' + i + 'seat' + j;

      seat.setAttribute('id', uniqueSeatId);
      row.appendChild(seat);
      seat.style.fontSize = '15px';
      seat.innerHTML = '<i class="fas fa-couch" aria-hidden="true"></i>'
      seat.style.paddingLeft = '3px';
      seat.style.paddingRight = '3px';

      let seatThatMatches = bookedSeats.filter(seat => seat.rowAndSeat == uniqueSeatId);

      // Her sætter vi de bookede sæder til rød og tilføjer en eventListener på alle andre felter
      if(seatThatMatches.length > 0){
        seat.style.color = 'red';


      }
      // vi tilføjer en eventListener på alle de IKKE-optagede sæder
      else{
        /* funktionen addSeat kaldes når der trykkes på et ikke-rødt felt
            Den tjekker om feltet allerede er på chosenTimeSlots-arrayet
              hvis den ikke er: tilføjes den til array'et og farven ændres til blå
              hvis den er: tages den af array'et og farven ændres til hvid igen
         */
        seat.style.color = 'grey';

        seat.addEventListener('click', addOrRemoveChosenSeatToChosenSeatsArray);
      }

      // denne funktion kaldes hver gang man trykker på et ikke-rødt sæde
      function addOrRemoveChosenSeatToChosenSeatsArray(){
        // hvis feltet IKKE allerede er valgt og lagt på chosenSeats-arrayet
        if(!chosenSeats.includes(uniqueSeatId)){
          // ændrer vi sædets farve til grøn, for at indikere at den er valgt
          seat.style.color = 'green';
          // tilføjer til chosenSeats-arrayet
          chosenSeats.push(uniqueSeatId);

          amountOfChosenSeats++;
        }
        // hvis feltet ER valgt og dermed lagt på chosenSeats-arrayet
        else{
          // ændrer vi cellens farve til grey, for at indikere at den er IKKE valgt
          seat.style.color = 'grey';

          // sletter vi den fra chosenSeats-arrayet
          // vi finder det index-tal hvor uniqueSeatId ligger, og sletter det fra listen
          delete chosenSeats[chosenSeats.indexOf(uniqueSeatId)];

          amountOfChosenSeats--;
          console.log(amountOfChosenSeats);
        }
        h4AmountOfChosenSeats.innerText = 'Du har valgt ' + amountOfChosenSeats + ' sæder';
      }
    }
  }
  divCalendar.appendChild(h4AmountOfChosenSeats);
  divCalendar.appendChild(document.createElement('br'));
  divCalendar.appendChild(table);
  divCalendar.appendChild(document.createElement('br'));
  divCalendar.appendChild(btnSubmit);

  //TODO
  function bookChosenSeats(){



    // FØRSTE FETCH - laver ny booking
    const requestOptions1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // betyder == vi sender et json i string-format
      },
      //mode: 'no-cors',
      body: localStorage.getItem('loggedInUser')
    };

    const url1 = 'http://localhost:8080/bookings';

    let newBooking;

    // vi laver en ny booking i db, får den sendt tilbage hertil og gemmer den i newBooking-variablen
    fetch(url1, requestOptions1)
      .then(result => result.json())
      .then(bookingResult => newBooking = bookingResult)
      .then(console.log)
      .then(fetchPostSeats)
      .catch(error => console.log("error", error));



    // ANDEN FETCH - laver nye sæder
    function fetchPostSeats(){

      // hver gang vi fjerner noget fra array'et laver
      filteredChosenSeats = chosenSeats.filter(function (el) {
        return el != null;
      });

      const body = filteredChosenSeats.map(createSeatJSON);

      function createSeatJSON(seat){

        const seatJSON = {
          'rowAndSeat': seat,
          'booking': newBooking,
          'uniqueTimeSlot' : chosenTimeSlot
        };

        return seatJSON;//JSON.stringify(uniqueTimeSlotJSON);
      }

      const requestOptions2 = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // betyder == vi sender et json i string-format
        },
        body: JSON.stringify(body)
      };

      const url2 = 'http://localhost:8080/seats';

      fetch(url2, requestOptions2)
        .then(result => result.json())
        .then(redirect)
        .catch(error => console.log("error", error));


      function redirect(newlyBookedSeats){
        // Booking-obj
        localStorage.setItem('newBooking', JSON.stringify(newBooking));
        // array af Seat-obj
        localStorage.setItem('newlyBookedSeats', JSON.stringify(newlyBookedSeats));
        localStorage.setItem(('chosenTimeSlot'), JSON.stringify(chosenTimeSlot));

        window.location.replace('../customer/booking-confirmation.html');
      }

    }

  }



}
