const movie = JSON.parse(localStorage.getItem('selectedMovie'));
const title = document.getElementById('title');

let day;// TODO overvej at skære fra
let month;
let year;
let firstDayOfMonth;
let numberOfDaysInMonth;
let today = new Date();
let bookedTimeSlots = [];
let chosenTimeSlot;



const findNumberOfDaysInMonth = function(month,year) {
  return new Date(year, month, 0).getDate();
};

const divCalendar = document.getElementById('divCalendar');

generateCalendar();

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

  const url = `http://localhost:8080/unique-time-slots/id-movie/${movie.id}`;

  console.log(url);

  fetch(url, requestOptions)
    .then(response => response.json())
    // vi henter stringværdierne på attributten uniqueTimeSlot ud og tilføjer dem til bookedTimeslots
    .then(uniqueTimeSlots => bookedTimeSlots = uniqueTimeSlots)//uniqueTimeSlots => bookedTimeSlots = uniqueTimeSlots.map(x => x.uniqueTimeSlot))
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
  const btnSubmit = document.createElement('button');
  btnSubmit.setAttribute('id', 'btnSubmit');
  btnSubmit.addEventListener('click', addChosenTimeSlotsToMovie);
  btnSubmit.innerText = "Tilføj valgte tider";
  btnSubmit.style.backgroundColor = '#c1f3ba';

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
  divCalendar.appendChild(btnSubmit);

  function addChosenTimeSlotsToMovie(){
    // hver gang vi fjerner noget fra array'et laver
    filteredChosenTimeSlots = tempChosenTimeSlots.filter(function (el) {
      return el != null;
    });

    const body = filteredChosenTimeSlots.map(createUniqueTimeSlotJSON);

    console.log(JSON.stringify(body));


    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // betyder == vi sender et json i string-format
      },
      body: JSON.stringify(body)
    };

    const url = 'http://localhost:8080/unique-time-slots';

    fetch(url, requestOptions)
      .then(console.log)
      //.then(result => result.json())
      .then(redirect)
      .catch(error => console.log("error", error));


    function redirect(){
      localStorage.setItem('movie', '');
      window.location.replace('../staff/create-movie.html');
    }


    function createUniqueTimeSlotJSON(uniqueTimeSlot){

      const uniqueTimeSlotJSON = {
        'uniqueTimeSlot': uniqueTimeSlot,
        'idMovie': movie.id
      };

      return uniqueTimeSlotJSON;//JSON.stringify(uniqueTimeSlotJSON);
    }

  }

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
    tdBio1TimeSlot1.innerText = "16:00-19:00";
    tdBio2TimeSlot1.innerText = "16:00-19:00";
    tdBio1TimeSlot2.innerText = "20:00-23:00";
    tdBio2TimeSlot2.innerText = "20:00-23:00";

    setBookedTimeSlotsToRedAndBlue(timeSlot1Id, tdBio1TimeSlot1);
    setBookedTimeSlotsToRedAndBlue(timeSlot2Id, tdBio2TimeSlot1);
    setBookedTimeSlotsToRedAndBlue(timeSlot3Id, tdBio1TimeSlot2);
    setBookedTimeSlotsToRedAndBlue(timeSlot4Id, tdBio2TimeSlot2);

    function setBookedTimeSlotsToRedAndBlue(timeSlotId, timeSlotElement){
      // Det er denne variabel som indgår i UniqueTimeSlot-klassen som attribut
      // year2021month3week1day3row2bio1;
      const uniqueTimeSlot = 'year' + year + 'month' + month + timeSlotId;

      // Her sætter vi de bookede tidspunker til rød og tilføjer en eventListener på alle andre felter
      if(bookedTimeSlots.includes(uniqueTimeSlot)) {
        timeSlotElement.style.backgroundColor = '#21f683';
        // vi tilføjer en eventListener på alle optagede tidsceller
        timeSlotElement.addEventListener('click', chooseTimeSlot);


      }

      //TODO her skal vi ændre i funktionen
      function chooseTimeSlot(){

        chosenTimeSlot = uniqueTimeSlot;
        console.log(chosenTimeSlot);

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





// opretter biograf med sæder
function generateSeatsTable(){
  divCalendar.innerHTML = "";
  title.innerText = "Vælg sæder";
  //TODO
  //getBookedSeats();

   const theaterNo = chosenTimeSlot.substring(31, 32);
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

  createTheater(rows,seatsPrRow);

}

// TODO
function getBookedSeats(){

  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // betyder == vi sender et json i string-format
    }
  };

  const url = `http://localhost:8080/bookings/id-movie/${movie.id}`;

  console.log(url);

  fetch(url, requestOptions)
    .then(response => response.json())
    // vi henter stringværdierne på attributten uniqueTimeSlot ud og tilføjer dem til bookedTimeslots
    .then(uniqueTimeSlots => bookedTimeSlots = uniqueTimeSlots)//uniqueTimeSlots => bookedTimeSlots = uniqueTimeSlots.map(x => x.uniqueTimeSlot))
    .then(addDatesToCalendar)
    .catch(error => console.log("error: ", error));


}

function createTheater(rows, seatsPrRow){

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
      seat.setAttribute('id', 'row' + i + 'seat' + j);
      row.appendChild(seat);
      seat.style.fontSize = '15px';
      seat.innerHTML = '<i class="fas fa-couch" aria-hidden="true"></i>'
      seat.style.color = 'grey';
      seat.style.paddingLeft = '3px';
      seat.style.paddingRight = '3px';

    }
  }
  divCalendar.appendChild(table);
  divCalendar.appendChild(document.createElement('br'));
  divCalendar.appendChild(btnSubmit);

  //TODO
  function bookChosenSeats(){
    // hver gang vi fjerner noget fra array'et laver
    filteredChosenTimeSlots = tempChosenTimeSlots.filter(function (el) {
      return el != null;
    });

    const body = filteredChosenTimeSlots.map(createUniqueTimeSlotJSON);

    console.log(JSON.stringify(body));


    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // betyder == vi sender et json i string-format
      },
      body: JSON.stringify(body)
    };

    const url = 'http://localhost:8080/unique-time-slots';

    fetch(url, requestOptions)
      .then(console.log)
      //.then(result => result.json())
      .then(redirect)
      .catch(error => console.log("error", error));


    function redirect(){
      localStorage.setItem('movie', '');
      window.location.replace('../staff/create-movie.html');
    }


    function createUniqueTimeSlotJSON(uniqueTimeSlot){

      const uniqueTimeSlotJSON = {
        'uniqueTimeSlot': uniqueTimeSlot,
        'idMovie': movie.id
      };

      return uniqueTimeSlotJSON;//JSON.stringify(uniqueTimeSlotJSON);
    }

  }



}
