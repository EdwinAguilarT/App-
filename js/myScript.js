function showaddClient(){
  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Nuevo cliente</h1>
  <div class="form">
    <h2>Usuario: `+userKey+`< /h2>
    <br>
    <input placeholder="Nombre..." type="text" id="firstName">
    <input placeholder="Apellido..." type="text" id="lastName">
    <input placeholder="Dni..." type="text" id="dni">
    <input placeholder="País..." type="text" id="country">
    <input type="submit" onclick="doaddClient()" value="Crear">
    <input type="submit" onclick="dolistClient()" value="Cancelar">
  </div>
  <div id="error">
  </div>
  ` 
  ;
}

function doaddClient(){
  let firstName = document.getElementById('firstName').value;  
  let lastName = document.getElementById('lastName').value;  
  let dni = document.getElementById('dni').value;  
  let country = document.getElementById('country').value;  

  if(firstName && lastName && dni && country){
    var url = "cgi-bin/addClient.pl?firstName?="+firstName+"&lastName="+lastName+"&dni="+dni+"&country"+country;
    var promise = fetch(url);
    promise.then(response => response.text())
      .then(data => {
        var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        responseAddClient(xml);
    }).catch(error => {
      console.log('Error:', error);
    });
  } else{
    document.getElementById('error').innerHTML = "<h1 style=color:#1ab188;background-color:red;padding:40px;>Ingrese los datos correctamente</h1>";
  }
}

function responseAddClient(response){
  let firstName = response.getElementByTagName("firstName")[0];
  let lastName = response.getElementByTagName("lastName")[0];
  let dni = response.getElementByTagName("dni")[0];
  let country = response.getElementByTagName("country")[0];

  if(response.getElementByTagName("firstName")) {
    let html = "<h2>" + firstName.textContent + "</h2>";
    html += "<h2>" + lastName.textContent + "</h2>";
    html += "<h2>" + dni.textContent + "</h2>";
    html += "<h2>" + country.textContent + "</h2>";
    document.getElementById("main").innerHTML = html;
  } else {
    document.getElementById("error").innerHTML = "<h1 style=background-color:red; color:white>Datos erróneos</h1>"
  }
}

function doremoveClient(dni){
  var url = "cgi-bin/removeClient.pl?dni="+dni;
  var promise = fetch(url);
  promise.then(response => response.text())
    .then(data => {
      dolistClient();
  }).catch(error => {
    console.log('Error:', error);
  });
}

function doeditClient(dni){
  var url = "cgi-bin/Client.pl?dni="+dni;
  var promise = fetch(url);
  promise.then(response => response.text())
    .then(data => {
      var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      respondeEditClient(xml);
  }).catch(error => {
    console.log('Error:', error);
  }); 
}

function respondEditClient(response) {
  let firstName = response.getElementByTagName("firstName")[0];
  let lastName = response.getElementByTagName("lastName")[0];
  let dni = response.getElementByTagName("dni")[0];
  let country = response.getElementByTagName("country")[0];

  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Actualizar a cliente</h1>
  <div class="form">
    <input type="text" id="firstNameUpdate" value=`+ firstName +`>
    <input type="text" id="lastNameUpdate" value=`+ lastName +`>
    <input type="text id="dniUpdate" value=`+ dni +`>
    <input type="text id="countryUpdate" value=`+ country +`>
    <br>
    <input type="submit" value="Actualizar"  onclick="doUpdate()">
  </div>
  `;
}