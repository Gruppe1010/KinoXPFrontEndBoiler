
// vi gemmer vores inputfelter i const-vars
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

// vi gemmer vores pb i en var
const pbLogIn = document.getElementById("pbLogIn");

// vi opretter variabler, hvori vi gemmer det indtastede input fra input-felterne
//let email;
//let password;
var loggedInUserId;

//const url = "http://localhost:8080/customers?email=${email}&password=${password}";

pbLogIn.addEventListener('click', logIn);

function logIn() {
  //retrieveInput();

  const email = inputEmail.value;
  const password = inputPassword.value;

  const url = `http://localhost:8080/customers?email=${email}&password=${password}`;

  /*
  const requestOptions = {
    method: 'GET',
    headers: {
      'content-type': 'application/json' // betyder == vi sender et json i string-format
    },
    redirect: 'follow',
    mode:'no-cors'
  };

   */

  fetch(url)
    .then(response => response.json())
    .then(data =>  checkIfSuccess(data))
    .catch(error => console.log("error: ", error));
}


function createJSONLoggedInUser(email, password){
  // vi laver et object (JSON-obj er standard obj i js)
  let user = {
    "email": email,
    "password": password
  };

  /* Vi laver JSON om til en String
     Fordi at body i requestOptions'en skal angives som string
   */
  return JSON.stringify(user);
}


function retrieveInput(){
  email = inputEmail.value;
  password = inputPassword.value;
}

function checkIfSuccess(data){
  if(data.id !== 0){
    console.log("succes: ", data)
    loggedInUserId = data.id;
    localStorage.setItem("loggedInUserId", data.id)
    window.location.replace("index.html");
  }
  else{
    alert("Log ind fejlede, prøv igen");
  }
}
