
// vi gemmer vores inputfelter i const-vars
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

// vi gemmer vores pb i en var
const pbLogIn = document.getElementById('pbLogIn');

pbLogIn.addEventListener('click', logIn);
//document.addEventListener('keydown', logIn);


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


function checkIfSuccess(user){
  if(user.id !== 0){
    console.log("succes: ", user)
    // vi laver vores JSON-user-obj om til en String via JSON.stringify
    // vi gemmer hele vores String-user-obj i localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.replace('../general/index.html');
  }
  else{
    alert("Log ind fejlede, prøv igen");
  }
}
