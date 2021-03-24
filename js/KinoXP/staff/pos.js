
const posContent = document.getElementById('posContent');

startPage();

function startPage(){

// opretter elementer
  const viewAllCandy = document.createElement('a');
  const createCandy = document.createElement('a');

// tilføjer elementer
  posContent.appendChild(viewAllCandy);
  posContent.appendChild(document.createElement('br'));
  posContent.appendChild(createCandy);

// udarbejder elementer
  viewAllCandy.innerText = "Se slikudvalg";
  viewAllCandy.style.fontSize = '20px';
  createCandy.innerText = "Opret nyt slik";
  createCandy.style.fontSize = '20px';


  viewAllCandy.addEventListener('click', candy);
  createCandy.addEventListener('click', createCandyFunction);

}

// candy.HTML
function candy(){


  const url = "http://localhost:8080/candy";
  const posContent = document.getElementById('posContent');

// først sletter jeg det som før har været på siden
  posContent.innerHTML = "";


// let cart = [];
// localStorage.setItem('cart', );


  fetch(url)
    .then(response => response.json())
    .then(candyList => candyList.forEach(showCandy))
    .catch(error => console.log("error: ", error));


// funktioner til candy.HTML
  function showCandy(candy){

    /*
    <div> outerDivCandy

      <div className="col-sm-3"> divCandy == onclick = addToCart - UNLESS stock == 0
        <img src="https://placehold.it/150x80?text=IMAGE" className="img-responsive" style="width:80%" alt="Image"> imgCandy
        <br>
        <p>Navn</p>
        <p>Stock</p>
      </div>


      <button> buttonCandy
        Rediger vare
      </button>
    </div>
     */

    // opretter forskellige elementer
    // TODO lav den der fancy rækkemåde at vise sliket på - ligesom movies
    const outerDivCandy = document.createElement('div');
    const divCandy = document.createElement('div')
    const imgCandy = document.createElement('img');
    const pNameCandy = document.createElement('p');
    const pPriceCandy = document.createElement('p');
    const pStockCandy = document.createElement('p');
    const buttonCandy = document.createElement('button');

    // tilføjer elementer til DOM-træet
    posContent.appendChild(outerDivCandy);
    outerDivCandy.appendChild(divCandy);
    divCandy.appendChild(imgCandy);
    divCandy.appendChild(pNameCandy);
    divCandy.appendChild(pPriceCandy);
    divCandy.appendChild(pStockCandy);
    divCandy.appendChild(buttonCandy);

    // udarbejder elementer
    posContent.classList.add('container-fluid', 'bg-3');
    outerDivCandy.classList.add('row');
    divCandy.classList.add('col-sm-2');
    divCandy.align = 'center';
    imgCandy.setAttribute('src', candy.base64);
    imgCandy.classList.add('img-responsive');
    imgCandy.style.width='80%';
    imgCandy.style.maxHeight= '295px';
    imgCandy.style.maxWidth= '200px';
    pNameCandy.innerText = candy.name;
    pNameCandy.style.fontWeight = 'bold';
    pPriceCandy.innerText = candy.price + " DKK";
    pStockCandy.innerText = candy.stock + " stk. tilbage";
    buttonCandy.innerText = "Rediger " + candy.name;

    imgCandy.addEventListener('click', addToCart);
    buttonCandy.addEventListener('click', goToEditCandy);

    // hvis der ikke er mere slik tilbage, bliver billedet gråt
    if(candy.stock === 0){
      imgCandy.style.filter = "grayscale(100%)";
    }

    outerDivCandy.appendChild(divCandy);
    divCandy.appendChild(buttonCandy);

    function addToCart(candy){

      alert("tilføj");

      if(candy.stock === 0){
        alert("Der er ikke flere på lager")
      }
      // ellers add to cart

    }

    function goToEditCandy(){
      localStorage.setItem('currentCandy', JSON.stringify(candy));
      window.location.replace('../staff/edit-candy.html');
    }
  }
  // TODO

}

//create-candy.HTML
function createCandyFunction(){
  posContent.innerHTML = "";
  /*
  <div id="posContent" class="container-fluid bg-3 text-center">
    <div align="center" class="row"> div
      <label for="candyPoster">Billede</label>
      <input type="file" name="file" id="candyPoster" required><br><br>

      <label for="name">Navn</label>
      <input type="text" name="name" id="name" required><br><br>

      <label for="price">Pris pr. stk.</label>
      <input type="number" name="price" id="price" required><br><br>

      <label for="stock">Antal på lager</label>
      <input type="number" name="stock" id="stock" required><br><br>

      <button id="pbSubmitCandy">Tilføj film</button>
    </div>
  </div>
   */

  // opretter elementer
  const divCreateCandy = document.createElement('div');
  const inputCandyPoster = document.createElement('input');
  const inputName = document.createElement('input');
  const inputPrice = document.createElement('input');
  const inputStock = document.createElement('input');

  const labelCandyPoster = document.createElement('label');
  const labelName = document.createElement('label');
  const labelPrice = document.createElement('label');
  const labelStock = document.createElement('label');

  const button  = document.createElement('button');

  // tilføjer dem til DOM-træ
  posContent.appendChild(divCreateCandy);
  addLabelAndInputToDom(labelCandyPoster, inputCandyPoster);
  addLabelAndInputToDom(labelName, inputName);
  addLabelAndInputToDom(labelPrice, inputPrice);
  addLabelAndInputToDom(labelStock, inputStock);

  function addLabelAndInputToDom(label, input){
    divCreateCandy.appendChild(label);
    divCreateCandy.appendChild(input);
    divCreateCandy.appendChild(document.createElement('br'));
    divCreateCandy.appendChild(document.createElement('br'));
  }
  divCreateCandy.appendChild(button);

  // udarbejder elemementer
  setInputElement(inputCandyPoster, "file", "candyPoster");
  setInputElement(inputName, "text", "name");
  setInputElement(inputPrice, "number", "price");
  setInputElement(inputStock, "number", "stock");

  function setInputElement(element, type, name){

    element.type = type;
    element.name = name;
    element.id = name;
    element.required = true;

  }

  setLabelElement(labelCandyPoster, 'candyPoster', 'Billede:');
  setLabelElement(labelName, 'name', 'Navn:\u00A0');
  setLabelElement(labelPrice, 'price', 'Pris pr. stk.:\u00A0');
  setLabelElement(labelStock, 'stock', 'Antal på lager:\u00A0');

  function setLabelElement(element, value, innerText){
    element.setAttribute('for', value);
    element.innerText = innerText;
  }

  button.id="pbSubmitCandy";
  button.innerText = "Tilføj slik";


  // TILFØJ CANDY

  button.addEventListener('click', addCandy);


  function addCandy(){
    let candyPoster = inputCandyPoster.files[0];
    let name = inputName.value;
    let price = inputPrice.value;
    let stock = inputStock.value;


    const candyPosterPromise = getBase64(candyPoster);
    let base64;


    candyPosterPromise.then(function (result) {
      base64 = result;

      const candyJSON = {
        'base64': base64,
        'name': name,
        'price': price,
        'stock': stock
      }

      console.log(candyJSON);

      const body = JSON.stringify(candyJSON);

      //Vi laver nogle specifikationer til vores request
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // betyder == vi sender et json i string-format
        },
        body: body
      };

      const url = 'http://localhost:8080/candy';

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => checkIfSuccess(data))
        .catch(error => console.log("error: ", error));

    });



    function getBase64(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    function checkIfSuccess(data) {

      console.log(data.id);

      if (data.id !== 0) {
        alert("Du har nu oprettet " + data.name + " succesfuldt");

        createCandyFunction();

      } else {
        alert("Der skete en fejl!!1");
      }
    }

  }







}






