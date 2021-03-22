let day;// TODO overvej at skære fra
let month;
let year;
let firstDayOfMonth;
let numberOfDaysInMonth;
let today = new Date();
let bookedTimeSlots = [];



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
  addDatesToCalendar();
}

// Henter alle de bookede film for måneden i det gældende år
// tilføjer uniqueTimeSlot-strings til bookedTimeSlots-Set
function getBookedTimeSlots(){

  const url = `http://localhost:8080/uniqueTimeSlots?year=${year}&month=${month}`;

  fetch(url)
    .then(response => response.json())
    .then(uniqueTimeSlots => uniqueTimeSlots.forEach(setBookedTimeSlots))
    .catch(error => console.log("error: ", error));

  // tilføjer uniqueTimeSlot-strings til bookedTimeSlots-Set
  function setBookedTimeSlots(timeSlot){
    bookedTimeSlots.push(timeSlot.uniqueTimeSlot);
  }
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

  const monday = document.createElement('TH');
  monday.setAttribute('id', 'monday');
  monday.innerText = "Mandag";

  const tuesday = document.createElement('TH');
  tuesday.setAttribute('id', 'tuesday');
  tuesday.innerText = "Tirsdag";

  const wednesday = document.createElement('TH');
  wednesday.setAttribute('id', 'wednesday');
  wednesday.innerText = "Onsdag";

  const thursday = document.createElement('TH');
  thursday.setAttribute('id', 'thursday');
  thursday.innerText = "Torsdag";

  const friday = document.createElement('TH');
  friday.setAttribute('id', 'friday');
  friday.innerText = "Fredag";

  const saturday = document.createElement('TH');
  saturday.setAttribute('id', 'saturday');
  saturday.innerText = "Lørdag";

  const sunday = document.createElement('TH');
  sunday.setAttribute('id', 'sunday');
  sunday.innerText = "Søndag";

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

    setBookedTimeSlotsToRed(timeSlot1Id, tdBio1TimeSlot1);
    setBookedTimeSlotsToRed(timeSlot2Id, tdBio1TimeSlot2);
    setBookedTimeSlotsToRed(timeSlot3Id, tdBio2TimeSlot1);
    setBookedTimeSlotsToRed(timeSlot4Id, tdBio2TimeSlot2);

    function setBookedTimeSlotsToRed(timeSlotId, timeSlotElement){
      // Det er denne variabel som indgår i UniqueTimeSlot-klassen som attribut
      // year2021month3week1day3row2bio1;
      const uniqueTimeSlot = 'year' + year + 'month' + month + timeSlotId;

      let timeSlotIsBooked;

      console.log(bookedTimeSlots.forEach(test));

      function test(time){
        return time;
        console.log(time == 'year' + year + 'month' + month + timeSlotId);
      }


      //console.log(Arrays.asList(bookedTimeSlots).contains('year' + year + 'month' + month + timeSlotId));
      // if(Arrays.asList(codes).contains(userCode))
      /*
      if(bookedTimeSlots.has(uniqueTimeSlot)){
        console.log("Hej");
        timeSlotElement.style.backgroundColor = '#FD7B7B';

      }

       */
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


  pbNextMonth.setAttribute('id', 'nextMonth');
  pbNextMonth.innerHTML = "næste måned &#11166;"
  pbNextMonth.style.display = 'inline';

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



