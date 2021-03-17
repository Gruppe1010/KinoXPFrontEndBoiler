let loggedInUserId = localStorage.getItem('loggedInUserId');
let loggedInUserType = localStorage.getItem('loggedInUserType');

alert("loggedInUserType på index: " + loggedInUserType);



// hvis der er nogen som er logget ind
if (loggedInUserId !== 'null'){
  // vi fjerner Opret Bruger linket i menubar
  const linkCreateUser = document.getElementById('linkCreateUser');
  linkCreateUser.remove();

  // Vi ændrer Log ind link til Log ud
  const linkLogIn = document.getElementById('linkLogIn');
  linkLogIn.href ='index.html';
  linkLogIn.innerText='Log ud';
  linkLogIn.addEventListener('click', logOut);

  const menuBar = document.getElementById('menuBar');

  if(loggedInUserType == 3){



  }

  else if(loggedInUserType == 2){

  }
  // vi ved nu at det er en customer
  else{

    let li = document.createElement('li');

    let a = document.createElement('a');
    // tekst som står inde i a-tagget
    let textForLink = document.createTextNode("Mine Bookinger");
    // tilføjer tekst til a-tag
    a.appendChild(textForLink);

    a.href='bookings.html';

    li.appendChild(a);

    menuBar.appendChild(li);

  }



}

function logOut(){
  localStorage.setItem('loggedInUserId', null);
  localStorage.setItem('loggedInUserType', null);
  window.location.replace='index.html';
}















