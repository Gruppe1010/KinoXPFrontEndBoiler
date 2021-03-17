
// vi gemmer vores inputfelter i const-vars
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');

// vi gemmer vores pb i en var
const pbLogIn = document.getElementById('pbLogIn');

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


function checkIfSuccess(data){
  if(data.id !== 0){
    console.log("succes: ", data)
    localStorage.setItem('loggedInUserId', data.id)
    localStorage.setItem('loggedInUserType', data.type)
    window.location.replace('index.html');
  }
  else{
    alert("Log ind fejlede, prøv igen");
  }
}
