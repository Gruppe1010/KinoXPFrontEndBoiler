let loggedInUserId = localStorage.getItem("loggedInUserId");
alert("hej" + loggedInUserId);


if (loggedInUserId !== 'null'){
  const linkLogIn = document.getElementById("linkLogIn");
  const linkCreateUser = document.getElementById("linkCreateUser");

  linkLogIn.href ="index.html";
  linkLogIn.innerText="Log ud";
  linkLogIn.addEventListener('click', logOut);

  linkCreateUser.remove();

}

function logOut(){
  localStorage.setItem("loggedInUserId", null);
  window.location.replace="index.html";
}















