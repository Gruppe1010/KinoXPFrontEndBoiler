const findNumberOfDaysInMonth = function(month,year) {
  return new Date(year, month, 0).getDate();
};

const divCalendar = document.getElementById('divCalendar');

const today = new Date();

let day;
let month;
let year;
let firstDayOfMonth;
let numberOfDaysInMonth;

// vi sætter alle date-variabler som er oprettet ovenfor
setDateInfo(today);
changeMonth();
createCalendar();
addDatesToCalendar();

function setDateInfo(today) {
  day = today.getDate();
  month = today.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  year = today.getFullYear();

  firstDayOfMonth = new Date(year, month - 1, 1).getDay();
  numberOfDaysInMonth = findNumberOfDaysInMonth(month, year);
}

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

function addBioNumber(weekNumber, dayNumber){
  const tdBio1 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'row1bio' + 1);
  const tdBio2 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'row1bio' + 2);

  tdBio1.innerText = " Bio 1 ";
  tdBio2.innerText = " Bio 2 ";
}

function addBioTimeSlots(weekNumber, dayNumber){
  const timeSlot1Id = 'week' + weekNumber + 'day' + dayNumber + 'row2bio' + 1;
  const timeSlot2Id = 'week' + weekNumber + 'day' + dayNumber + 'row2bio' + 2;
  const timeSlot3Id = 'week' + weekNumber + 'day' + dayNumber + 'row3bio' + 1;
  const timeSlot4Id = 'week' + weekNumber + 'day' + dayNumber + 'row3bio' + 2;

  // Det er denne variabel som indgår i et Show som attribut
  // year2021month3week1day3row2bio1;
  // TODO Lav lige det her
  let uniqueTimeSlot1 = 'year' + year + 'month' + month + timeSlot1Id;
  let uniqueTimeSlot2 = 'year' + year + 'month' + month + timeSlot2Id;
  let uniqueTimeSlot3 = 'year' + year + 'month' + month + timeSlot3Id;
  let uniqueTimeSlot4 = 'year' + year + 'month' + month + timeSlot4Id;


  const tdBio1TimeSlot1 = document.getElementById(timeSlot1Id);
  const tdBio2TimeSlot1 = document.getElementById(timeSlot2Id);
  const tdBio1TimeSlot2 = document.getElementById(timeSlot3Id);
  const tdBio2TimeSlot2 = document.getElementById(timeSlot4Id);

  tdBio1TimeSlot1.innerText = "16:00-19:00";
  tdBio2TimeSlot1.innerText = "16:00-19:00";
  tdBio1TimeSlot2.innerText = "20:00-23:00";
  tdBio2TimeSlot2.innerText = "20:00-23:00";
}

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


}

function changeMonth(){
  //Opretter elementerne
  const divMonth = document.createElement('div');
  const pbPreviousMonth = document.createElement('button');
  const selectedMonth = document.createElement('h1');
  const pbNextMonth = document.createElement('button');

  //Tilføjer elementerne
  divCalendar.appendChild(divMonth);
  divMonth.appendChild(pbPreviousMonth);
  divMonth.appendChild(selectedMonth);
  divMonth.appendChild(pbNextMonth);
  divCalendar.appendChild(document.createElement('br'));

  //Udarbejder elementerne
  pbPreviousMonth.setAttribute('id', 'previousMonth');
  pbPreviousMonth.innerText = "forrige måned";
  pbPreviousMonth.style.display = 'inline';
  pbPreviousMonth.style.lineBreak;

  pbNextMonth.setAttribute('id', 'nextMonth');
  pbNextMonth.innerText = "næste måned"
  pbNextMonth.style.display = 'inline';
  pbNextMonth.style.lineBreak;

  selectedMonth.setAttribute('id', 'selectedMonth');
  selectedMonth.style.display = 'inline';
  selectedMonth.style.breakAfter;

  if(month == '01'){
    selectedMonth.innerText = "Januar";
  }else if (month == '02'){
    selectedMonth.innerText = "Februar";
  }else if (month == '03'){
    selectedMonth.innerText = "Marts";
  }else if (month == '04'){
    selectedMonth.innerText = "April";
  }else if (month == '05'){
    selectedMonth.innerText = "Maj";
  }else if (month == '06'){
    selectedMonth.innerText = "Juni";
  }else if (month == '07'){
    selectedMonth.innerText = "Juli";
  }else if (month == '08'){
    selectedMonth.innerText = "August";
  }else if (month == '09'){
    selectedMonth.innerText = "September";
  }else if (month == '10'){
    selectedMonth.innerText = "Oktober";
  }else if (month == '11'){
    selectedMonth.innerText = "November";
  }else if (month == '12'){
    selectedMonth.innerText = "December";
  }

}
pbPreviousMonth.addEventListener('click', previousMonth);
pbNextMonth.addEventListener('click', nextMonth);

function previousMonth(){

}

function nextMonth(){

}

