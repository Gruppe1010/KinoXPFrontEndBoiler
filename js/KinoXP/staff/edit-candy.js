const candy = JSON.parse(localStorage.getItem('currentCandy'));
const posContent = document.getElementById('posContent');


//Opretter elementer
const lblPrice = document.createElement('label');
const lblStock = document.createElement('label');
const inputPrice = document.createElement('input');
const inputStock = document.createElement('input');
const imgCandy = document.createElement('img');
const h3CandyName = document.createElement('h3');
const btnSubmit = document.createElement('button');
const btnDelete = document.createElement('button');

//tilføjer til DOM
posContent.appendChild(h3CandyName);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(imgCandy);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(document.createElement('br'));
posContent.appendChild(lblPrice);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(inputPrice);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(document.createElement('br'));
posContent.appendChild(lblStock);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(inputStock);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(document.createElement('br'));
posContent.appendChild(btnSubmit);
posContent.appendChild(document.createElement('br'));
posContent.appendChild(document.createElement('br'));
posContent.appendChild(btnDelete);

//udarbejder elementer
h3CandyName.innerText = candy.name;
imgCandy.src = candy.base64;
imgCandy.style.width = '300px';

inputPrice.setAttribute('id', 'idPrice');
inputStock.setAttribute('id', 'idStock');
inputPrice.placeholder = candy.price;
inputStock.placeholder = candy.stock;

lblPrice.setAttribute('for', 'idPrice');
lblStock.setAttribute('for', 'idStock');
lblPrice.innerText = "Ændr pris: ";
lblStock.innerText = "Ændr antal på lager: ";

btnSubmit.innerText = "Gem ændringer";
btnSubmit.addEventListener('click', updateCandy);

btnDelete.innerText = "Fjern slik fra sortiment";
btnDelete.style.backgroundColor = '#ff7979';
btnDelete.addEventListener('click', deleteCandy);

function deleteCandy(){

  const candyJSON = {
    'id': candy.id
  }

  console.log(candyJSON);

  const body = JSON.stringify(candyJSON);

  //Vi laver nogle specifikationer til vores request
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json', // betyder == vi sender et json i string-format
    },
    body: body
  };
  const url = 'http://localhost:8080/candy';

  fetch(url, requestOptions)
    .catch(error => console.log("error: ", error));


  alert("Du har nu slettet :" + candy.name);
  window.location.replace('../staff/pos.html')

}
function updateCandy(){

  let inputPriceValue =  inputPrice.value;
  let price = candy.price;

  let inputStockValue =  inputStock.value;
  let stock = candy.stock;

  console.log(inputPriceValue);
  if (inputPriceValue != ""){
    price = inputPriceValue;
  }
  if (inputStockValue != ""){
    stock = inputStockValue;
  }

    const candyJSON = {
      'id': candy.id,
      'price': price,
      'stock': stock
    }

    console.log(candyJSON);

    const body = JSON.stringify(candyJSON);

  //Vi laver nogle specifikationer til vores request
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // betyder == vi sender et json i string-format
    },
    body: body
  };
  const url = 'http://localhost:8080/candy';

  fetch(url, requestOptions)
    .catch(error => console.log("error: ", error));


  alert("Du har nu redigeret i :" + candy.name);
  window.location.replace('../staff/pos.html')
}










