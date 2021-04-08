// vi henter den movie ud fra localStorage, som vi lige har created
// fordi det sidste vi gør i create-movie er at tilføje den nyeoprettede film til localStorace
const movie = JSON.parse(localStorage.getItem('newlyCreatedMovie'));
// vi hiver fat i div'en som vi vil lave hele kalenderen i
const divCalendar = document.getElementById('divCalendar');

let today = new Date();

let day;// TODO overvej at skære fra
let month;
let year;
let firstDayOfMonth; // == hvilken ugedag er den første dag i måneden
let numberOfDaysInMonth;

let bookedTimeSlots = [];
let tempChosenTimeSlots = [];
let filteredChosenTimeSlots = [];




generateCalendar();

// Laver HELE kalenderen - kalder alle andre funktioner
function generateCalendar(){
  // vi rydder divCalender som vi har lavet i html'en
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

  const url = `http://localhost:8080/unique-time-slots?year=${year}&month=${month}`;

  console.log(url);

  fetch(url, requestOptions)
    .then(response => response.json())
    // vi henter UniqueTimeSlot-objekter ud og lægger i bookedTimeSlotElements
    .then(uniqueTimeSlots => bookedTimeSlots = uniqueTimeSlots)
    // .then(test => bookedTimeSlots = bookedTimeSlotElements.map(x => x.uniqueTimeSlot)) TODO overvej at slette - vi henter ikke kun strings ud mere, men hele elementer
    .then(addDatesToCalendar)
    .catch(error => console.log("error: ", error));
}

// sætter alle date-attributter
function setDateInfo(today) {
  day = today.getDate();
  month = today.getMonth() + 1; // getMonth()-metoden returnerer Januar som 0 - derfor +1
  // month-variblen skal indeholde 2 cifre - derfor hvis den er fra 1-9 skal den plusses 0 foran
  if (month < 10) {
    month = "0" + month;
  }
  year = today.getFullYear();

  // firstDayOfMonth == hvilken ugedag er den første dag i måneden
  firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  // Da det er i USA er søndag ugen starter bliver søndag evalueret til 0.
  if(firstDayOfMonth === 0){
    firstDayOfMonth = 7;
  }
  numberOfDaysInMonth = findNumberOfDaysInMonth(month, year);

  function findNumberOfDaysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
  }
}

// Opretter alle celler i tabellen - vi laver hele skalden men UDEN at vi skriver noget i den
function createCalendar(){

  const btnSubmit = document.createElement('button'); // opretter button-element
  btnSubmit.setAttribute('id', 'btnSubmit');  // tilføjer id
  // når vi trykker på knappen --> tilføj valgte timeSlots til filmen
  btnSubmit.addEventListener('click', addChosenTimeSlotsToMovie);
  btnSubmit.innerText = "Tilføj valgte tider";
  btnSubmit.style.backgroundColor = '#c1f3ba';

  const table = document.createElement('TABLE');
  table.border = '1';
  table.style.textAlign = 'center';

  const tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  // laver den øverste række i tabellen: den med ugedagenavnene
  const headlineRow = document.createElement('TR');
  headlineRow.setAttribute('id', 'headlineRow');

  const monday = createDayElements('monday', 'Mandag');
  const tuesday = createDayElements('tuesday', 'Tirsdag');
  const wednesday = createDayElements('wednesday', 'Onsdag');
  const thursday = createDayElements('thursday', 'Torsdag');
  const friday = createDayElements('friday', 'Fredag');
  const saturday = createDayElements('saturday', 'Lørdag');
  const sunday = createDayElements('sunday', 'Søndag');

  // opretter en ny kolonne -
  function createDayElements(idDay, innerTextDay){
    const dayElement = document.createElement('TH');
    dayElement.setAttribute('id', idDay);
    dayElement.innerText = innerTextDay;
    dayElement.style.backgroundColor = '#a0a09d';
    dayElement.style.textAlign = 'center';

    return dayElement;
  }

  // vi tilføjer alle ugedage-kolonne-elementerne til den øverste række
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

  // vi laver de sidste 5 rækker som indeholder dagene
  for(let i = 1; i <=6; i++){
    // vi laver en ny række som repræsenterer en uge
    const week = document.createElement('TR');
    week.setAttribute('id', 'week' + i);

    // vi tilføjer uge-rækken til tabellen
    tableBody.appendChild(week);

    // vi tilføjer dag-kolonner til uge-rækken
    for(let j = 1; j <= 7; j++){
      const day = document.createElement('TD');
      day.setAttribute('id', 'week' + i + 'day' + j);

      // vi laver en date-row til dato-tallet
      const date = document.createElement('TR');
      // week1day6date
      date.setAttribute('id', 'week' + i + 'day' + j + 'date');
      date.setAttribute('colspan', '2');
      date.width = '100%'
      date.style.fontWeight = 'bold';
      date.style.fontSize = '15px';

      day.appendChild(date);

      // vi tilføjer 3 rækker til hver day-kolonne
      for(let k = 1; k <= 3; k++){
        const row = document.createElement('TR');
        row.setAttribute('id', 'week' + i + 'day' + j + 'row' + k);


        day.appendChild(row);

        // vi laver en bio kolonne i hver række
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

  // funktion som kaldes når man trykker på "tilføj valgte tider"-knappen
  function addChosenTimeSlotsToMovie(){
    // hver gang vi fjerner noget fra array'et laver den en tom ting på arrayet - det fjerner vi her
    filteredChosenTimeSlots = tempChosenTimeSlots.filter(function (el) {
      return el != null;
    });

    // vi laver alle uniqueTimeSlot's på array-listen om til JSON
    const body = filteredChosenTimeSlots.map(createUniqueTimeSlotJSON);

    function createUniqueTimeSlotJSON(uniqueTimeSlot){

      const uniqueTimeSlotJSON = {
        'uniqueTimeSlot': uniqueTimeSlot,
        'idMovie': movie.id
      };

      return uniqueTimeSlotJSON;//JSON.stringify(uniqueTimeSlotJSON);
    }

    // console.log(JSON.stringify(body));

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
      // vi guider viewet tilbage til create-movie siden
      window.location.replace('../staff/create-movie.html');
    }

  }
}

// tilføjer ALT indhold til cellerne
function addDatesToCalendar(){

  // innerTextDate == tallet som repræsenterer datoen, som skal vises/stå i feltet
  let innerTextDate = 0;

  // for-loop for den første kalenderuge
  // fordi d. 1. ikke altid er en mandag, men kan være alle ugens dage
  for(let i = 0; i <= 7 - firstDayOfMonth; i++) {

    // firstDayOfMonth == hvilken ugedag er den første dag i måneden
    // derfor afhængigt af hvilken ugedag som måneden starter på, kører dette for-loop kun fra dér og til og med 7
    let dayNumber = firstDayOfMonth + i;

    // vi hiver fat i data-feltet for elementet - det ved vi vi har givet et id: week1day?date
    const td = document.getElementById('week1day' + dayNumber + 'date');
    innerTextDate++;

    td.innerText = innerTextDate;

    addBioNumber(1, dayNumber);
    addBioTimeSlots(1, dayNumber);
  }
  // resten af ugerne i kalenderen
  // for-loop hvor i = ugenr - vi starter på 2 fordi vi har lige ordnet uge1
  for(let i = 2; i <=6; i++){
    // for-loop hvor j er dayNumber
    for(let j = 0; j < 7; j++) {

      innerTextDate++;

      // vi tjekker at vores innerTextDate ikke overstiger antallet af dage der er i måneden
      if(innerTextDate <= numberOfDaysInMonth){

        let dayNumber = 1 + j; // fordi j starter fra 0

        const td = document.getElementById('week' + i + 'day' + dayNumber + 'date');

        td.innerText = innerTextDate;

        // for hvert dags-element vil vi tilføje teksten "bio1" og "bio2" i første række
        addBioNumber(i, dayNumber);
        // for hvert dags-element vil vi tilføje tidsperioderne "16-19" eller "20-23" bio1 og bio2 i første række
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

  // tilføjer tidspunkterne "16-19" og "20-23" i de 4 tidspunktsceller i ÉN dagsfirkant
  function addBioTimeSlots(weekNumber, dayNumber){
    // vi laver id-Strings til hver celle som repræsenterer et tidspunkt
    const timeSlot1Id = 'week' + weekNumber + 'day' + dayNumber + 'row2bio' + 1;
    const timeSlot2Id = 'week' + weekNumber + 'day' + dayNumber + 'row2bio' + 2;
    const timeSlot3Id = 'week' + weekNumber + 'day' + dayNumber + 'row3bio' + 1;
    const timeSlot4Id = 'week' + weekNumber + 'day' + dayNumber + 'row3bio' + 2;

    // vi hiver fat i de 4 elementer ud fra id-Stringsne
    const tdBio1TimeSlot1 = document.getElementById(timeSlot1Id);
    const tdBio2TimeSlot1 = document.getElementById(timeSlot2Id);
    const tdBio1TimeSlot2 = document.getElementById(timeSlot3Id);
    const tdBio2TimeSlot2 = document.getElementById(timeSlot4Id);

    // vi sætter tidspunktet på hvert element
    tdBio1TimeSlot1.innerText = "16:00-19:00";
    tdBio2TimeSlot1.innerText = "16:00-19:00";
    tdBio1TimeSlot2.innerText = "20:00-23:00";
    tdBio2TimeSlot2.innerText = "20:00-23:00";

    tdBio1TimeSlot1.style.height = "35px";
    tdBio2TimeSlot1.style.height = "35px";
    tdBio1TimeSlot2.style.height = "35px";
    tdBio2TimeSlot2.style.height = "35px";

    // vi sætter farven på hvert timeSlot-element
    setBookedTimeSlotsToRedAndBlue(timeSlot1Id, tdBio1TimeSlot1);
    setBookedTimeSlotsToRedAndBlue(timeSlot2Id, tdBio2TimeSlot1);
    setBookedTimeSlotsToRedAndBlue(timeSlot3Id, tdBio1TimeSlot2);
    setBookedTimeSlotsToRedAndBlue(timeSlot4Id, tdBio2TimeSlot2);

    // funktion som sætter farven på et timeSlot-element
    function setBookedTimeSlotsToRedAndBlue(timeSlotId, timeSlotElement){
      // Det er denne variabel som indgår i UniqueTimeSlot-klassen som attribut
      // year2021month3week1day3row2bio1;
      const uniqueTimeSlot = 'year' + year + 'month' + month + timeSlotId;

      // vi tjekker om det uniqueTimeSlot er booket eller ej
      // bookedTimeSlots-array = alle de timeSlots som er bookede, som vi har fetchet i starten
      // hvis der er et element på bookedTimeSlots-arrayet som matcher vores uniqueTimeSlot, så gemmes det i timeSlotElementThatMatches
      let timeSlotElementThatMatches = bookedTimeSlots.filter(x => x.uniqueTimeSlot == uniqueTimeSlot);

      // if det er booket
      // Her sætter vi de bookede tidspunker til rød og tilføjer en eventListener på alle andre felter
      if(timeSlotElementThatMatches.length > 0) {
        // sæt baggrundsfarve til rød
        timeSlotElement.style.backgroundColor = '#FD7B7B';
      }
      // else, hvis ikke booket
      else{
        //tilføj eventListener på IKKE-optagede tidsceller
        timeSlotElement.addEventListener('click', addOrRemoveTimeSlotToChosenTimeSlotsArray);
      }

      // vi sørger for at de timeSlots som ligger på tempChosenTimeSlots bliver blå
      // ... hvis man skifter måned og kalenderen reloades
      if(tempChosenTimeSlots.includes(uniqueTimeSlot)) {
        timeSlotElement.style.backgroundColor = '#7bd8fd';
      }


      /* Kaldes når der trykkes på et ikke-rødt felt
            Den tjekker om feltet allerede er på chosenTimeSlots-arrayet
              hvis den ikke er: tilføjes den til array'et og farven ændres til blå
              hvis den er: tages den af array'et og farven ændres til hvid igen
         */
      function addOrRemoveTimeSlotToChosenTimeSlotsArray(){
        // if feltet IKKE allerede blevet valgt (dvs. er hvidt)
        if(!tempChosenTimeSlots.includes(uniqueTimeSlot)){
          // ændrer vi cellens farve til blå, for at indikere at den er valgt
          timeSlotElement.style.backgroundColor = '#7bd8fd';

          // tilføjer til tempChosenTimeSlots-arrayet
          tempChosenTimeSlots.push(uniqueTimeSlot);
        }
        // hvis feltet ER valgt (dvs. er blåt)
        else{
          // ændrer vi cellens farve til hvid, for at indikere at den er IKKE valgt
          timeSlotElement.style.backgroundColor = '';

          // sletter vi den fra tempChosenTimeSlots-arrayet
          // vi finder det index-tal hvor uniqueTimeSlot ligger, og sletter det fra listen
          delete tempChosenTimeSlots[tempChosenTimeSlots.indexOf(uniqueTimeSlot)];
        }
      }
    }
  }
}

// skift måned knapperne
function changeMonth(){
  //Opretter elementerne
  const divMonth = document.createElement('div');
  const pbPreviousMonth = document.createElement('button');
  const pbNextMonth = document.createElement('button');
  const selectedMonth = document.createElement('h1');
  const selectedYear = document.createElement('h1');


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



