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

/*
* <table id="dataTable" width="50%" border="1">
  <td>
    <input type="button" name="button1" value="Delete">
  </td>
  <td>1</td>
  <td>
    <input type="text" value="hej" name="nameTxt">
  </td>
</table>
*
* table --> tr --> td

*
* */

  const table = document.createElement('TABLE');

  const tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for(let i = 1; i <=5; i++){
    const week = document.createElement('TR');
    week.setAttribute('id', 'week' + i);
    week.innerText = "Hej";

    tableBody.appendChild(week);

    for(let j = 1; j <= 7; j++){
      const day = document.createElement('TD');
      day.setAttribute('id', 'week' + i + 'day' + j);
      day.innerText = "Hej";

      week.appendChild(day);
    }


  }

  table.innerText = "Hej";

  divCalendar.appendChild(table);


}





















