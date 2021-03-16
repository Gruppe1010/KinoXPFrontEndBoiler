

// vi gemmer vores inputfelter i const-vars
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputConfirmPassword = document.getElementById("comfirmPassword");

// vi gemmer vores pb i en var
const pbCreateUser = document.getElementById("pbCreateUser");

// vi opretter variabler, hvori vi gemmer det indtastede input fra input-felterne
let name;
let email;
let password;
let confirmPassword;

const url = "http://localhost:8080/customers";

pbCreateUser.addEventListener('click', insertUserIntoDb);

function insertUserIntoDb(){

  // vi henter værdier fra inputfelterne og sætter vores variabler
  retrieveInput();

  //isEmailAvailable(email);

  if (password === confirmPassword) {
    // vi opretter et JSON-obj ud fra inputfelters værdier
    body = createJSONCustomer(name, email, password);


    /*
    * Vi laver nogle specifikationer til vores request
    * */
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // betyder == vi sender et json i string-format
      },
      body: body
    };

    /*
    fetch(url, requestOptions)
      .then(reponse => reponse.json())
      .then(data =>  console.log("succes: ", data))
      .catch(error => console.log("error: ", error));

     */

    fetch(url, requestOptions)
      .then(reponse => reponse.json())
      .then(data =>  checkIfSuccess(data))
      .catch(error => console.log("error: ", error));

  } else {
    alert("De to passwords matcher ikke");
    }

}

function retrieveInput(){
  name = inputName.value;
  email = inputEmail.value;
  password = inputPassword.value;
  confirmPassword = inputConfirmPassword.value;
}

/**
 * Opretter JSON-string ud fra name, email, password
 * */
function createJSONCustomer(name, email, password){
  // vi laver et object (JSON-obj er standard obj i js)
  let user = {
    "name": name,
    "email": email,
    "password": password
  };

  /* Vi laver JSON om til en String
     Fordi at body i requestOptions'en skal angives som string
   */
  return JSON.stringify(user);
}

function checkIfSuccess(data){
  if(data.id !== 0){
    console.log("succes: ", data)
    localStorage.setItem("loggedInUserId", data.id)
    window.location.replace("index.html");
  }
  else{
    alert("Der findes allerede en bruger med denne email");
  }
}











































