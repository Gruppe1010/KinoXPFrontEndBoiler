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

createCalendar();
addDatesToCalendar();

function setDateInfo(today) {
  day = today.getDate();
  month = today.getMonth() + 2; //+ 1;
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

      const dayRowDate = document.createElement('TR');
      // week1day6date
      dayRowDate.setAttribute('id', 'week' + i + 'day' + j + 'date');
      dayRowDate.setAttribute('colspan', '2');
      dayRowDate.width = '100%'

      day.appendChild(dayRowDate);

      for(let k = 1; k <= 3; k++){
        const dayRow = document.createElement('TR');
        dayRow.setAttribute('id', 'week' + i + 'day' + j + 'dayrow' + k);

        day.appendChild(dayRow);

        for(let l = 1; l <= 2; l++){
          const dayRowCol = document.createElement('TD');
          dayRowCol.setAttribute('id', 'week' + i + 'day' + j + 'dayrow' + k + 'dayrowcol' + l);

          dayRow.appendChild(dayRowCol)
        }
      }
      week.appendChild(day);
    }
  }
  divCalendar.appendChild(table);
}

function addBioNumber(weekNumber, dayNumber){
  const tdBio1 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'dayrow1dayrowcol' + 1);
  const tdBio2 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'dayrow1dayrowcol' + 2);

  tdBio1.innerText = " Bio 1 ";
  tdBio2.innerText = " Bio 2 ";
}

function addBioTimeSlots(weekNumber, dayNumber){
  const tdBio1TimeSlot1 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'dayrow2dayrowcol' + 1);
  const tdBio1TimeSlot2 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'dayrow2dayrowcol' + 2);
  const tdBio2TimeSlot1 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'dayrow3dayrowcol' + 1);
  const tdBio2TimeSlot2 = document.getElementById('week' + weekNumber + 'day' + dayNumber + 'dayrow3dayrowcol' + 2);

  tdBio1TimeSlot1.innerText = "16:00-19:00";
  tdBio1TimeSlot2.innerText = "20:00-23:00";
  tdBio2TimeSlot1.innerText = "16:00-19:00";
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
