// vi henter hele JSON-stringen ud som vi har gemt på log-in.js og create-user.js
// denne String laver vi om til et JSON-obj via JSON.parse
let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

const loggedInUserId = loggedInUser.id;
const loggedInUserType = loggedInUser.type;
const loggedInUserName = loggedInUser.name;


// hvis der er nogen som er logget ind
if (loggedInUserId !== 'null'){
  // vi tager fat i createUser-linket for at ændre det
  const linkCreateUser = document.getElementById('linkCreateUser');

  // Vi ændrer Log ind link til Log ud
  const linkLogIn = document.getElementById('linkLogIn');
  linkLogIn.href ='../general/index.html';
  linkLogIn.innerText='Log ud';
  linkLogIn.addEventListener('click', logOut);

  const menuBar = document.getElementById('menuBar');
  const linkAbout = document.getElementById('linkAbout');
  const linkContact = document.getElementById('linkContact');

  let linkProfileText;

  // 1 == customer
  if(loggedInUserType == 1){

    // vi opretter "Mine bookinger"-fane
    let liBooking = document.createElement('li');
    // Man kunne også sige: liBooking.id = 'liBooking';
    liBooking.setAttribute('id', 'liBooking');

    let aBooking = document.createElement('a');
    // tekst som står inde i a-tagget
    let aBookinNode = document.createTextNode("Mine Bookinger");
    // tilføjer tekst til a-tag
    aBooking.appendChild(aBookinNode);
    aBooking.href='../customer/bookings.html';
    liBooking.appendChild(aBooking);
    menuBar.appendChild(liBooking);

    // vi tilføjer den rette tekst til tekstfelt til højre i menubar

    linkProfileText = loggedInUserName;

  }
  // 2 == staff
  else if(loggedInUserType == 2){

    // ændrer "Om os"-fane til at være "Tilføj film"-fane
    linkAbout.href ='../staff/create-movie.html';
    linkAbout.innerText="Tilføj film";

    // ændrer "Kontakt"-fane til at være "POS"-fane
    linkContact.href ='../staff/pos.html';
    linkContact.innerText="POS";

    // vi ændrer på tekst som står til højre i menubar
    linkProfileText = "Medarbejder - " + loggedInUserName;
  }
  // vi ved nu at det er en admin
  else{

    // ændrer "Om os"-fane til at være "Vagtplan"-fane
    linkAbout.href ='../admin/roster.html';
    linkAbout.innerText="Vagtplan";

    // ændrer "Kontakt"-fane til at være "Opret ny medarbejder"-fane
    linkContact.href ='../admin/create-new-staff.html';
    linkContact.innerText="Opret ny medarbejder";


    // vi ændrer på tekst som står til højre i menubar
    linkProfileText = "Admin - " + loggedInUserName;
  }

  linkCreateUser.href ='../general/profile.html';
  linkCreateUser.innerText=linkProfileText;
}



function logOut(){
  localStorage.setItem('loggedInUser', null);
  window.location.replace='../general/index.html';
}















