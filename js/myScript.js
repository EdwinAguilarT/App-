function showWelcome(){
  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
    <p>
    Esta página web esta dirigida a los administradores del Hostal Royal
    Princess. Por favor ingresa tus datos que fueron se le fueron
    proporcionados, en caso contrario crea tu cuenta en el apartado
    Crear Cuenta.
    </p>
    <br>
    <p>El sistema fue desarrollado usando estas tecnologías:</p>
    <ul>
      <li>HTML y CSS</li>
      <li>Perl para el backend</li>
      <li>MariaDB para la base de datos</li>
      <li>Javascript para el frontend</li>
    </ul>
  `;
}

function showMenuUserLogged(){
  let html = "<a onclick='showWelcome()'>Inicio</a>\n"+
    "<a onclick='doList()'>Clientes listados</a>\n"+
    "<a onclick='showNew()' class='rigthAlign'>Nuevo Cliente</a>\n"
  document.getElementById('menu').innerHTML = html;
}

function showRegister(){

}

function showLogin(){
  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Login</h1>
  <div class="login">
      <div class="form">
        <form class="registro" action="./cgi-bin/login.pl" method="POST">
          <input type="text" placeholder="Usuario..." name="user" id="user" required=""><br>
          <input type="password" placeholder="Contraseña..." name="password" id="password" required=""><br>
          <input type="submit" value="Ingresar">
          <p class="message">¿No estas registrado? <a href="register.html">Crear una cuenta</a></p>
        </form>
      </div>
    </div>  
  `;

  document.getElementById('main').innerHTML = html;
}

function doLogin(){
  let name = document.getElementById('user').value;
  let pass = document.getElementById('password').value;

  if(name && pass){
    var url = "cgi-bin/login.pl?user="+name+"&password="+pass;
    var promise = fetch(url);
    promise.then(response => response.text())
      .then(data => {
        var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        loginResponse(xml);
    }).catch(error => {
      console.log('Error:', error);
    });
  }else{
    document.getElementById('error').innerHTML = "<h1 style=color:#1ab188;background-color:red;padding:40px;>Ingrese los datos correctamente</h1>";
  }
}

function responseLogin(xml){
  if(xml.getElementsByTagName('admin')[0]){
    userKey = xml.getElementByTagName('admin')[0].textContent;
    showLoginSuccess();
  }else{
    document.getElementById('error').innerHTML = "<h1 style=color:#1ab188;background-color:red;padding:40px;>Datos erróneos</h1>";
  }
}

function showLoginSuccess(){
  document.getElementById('userName').innerHTML = userKey;
  showWelcome();
  showMenuUserLogged();
}

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
  let firstName = response.getElementByTagName("firstName")[0].textContent;
  let lastName = response.getElementByTagName("lastName")[0].textContent;
  let dni = response.getElementByTagName("dni")[0].textContent;
  let country = response.getElementByTagName("country")[0].textContent;
  let isHere = response.getElementByTagName("isHere")[0].textContent;

  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Actualizar a cliente</h1>
  <div class="form">
    <input type="text" id="firstNameUpdate" name="firstNameUpdate" value=`+ firstName +`>
    <input type="text" id="lastNameUpdate" name="lastNameUpdate" value=`+ lastName +`>
    <input type="text" id="dniUpdate" name="dniUpdate" value=`+ dni +`>
    <input type="text" id="countryUpdate" name="countryUpdate" value=`+ country +`>
    <input type="text" id="isHereUpdate" name="isHereUpdate" value=`+ isHere +`>
    <br>
    <input type="submit" value="Actualizar"  onclick="doUpdate(`+dni+`)">
  </div>
  `;
  document.getElementById('main').innerHTML = html;
}

function doUpdate(dni){

  let firstName = firstNameUpdate.value;
  let lastName = lastNameUpdate.value;
  let dni = dniUpdate.value;
  let country = countryUpdate.value;
  let isHere = isHereUpdate.value;

  var url = "cgi-bin/editClient.pl?firstName="+firstName+"&lastName="+lastName+"&dni="+dni+"&country="+country+"&isHere="+isHere;
  var promise = fetch(url);
  promise.then(response => response.text())
    .then(data => {
      console.log(data);
      var html = (new window.DOMParser()).parseFromString(data, "text/html");
      responseAddClient(html);
  }).catch(error => {
    console.log('Error:', error);
  });
}

function doList(){
  var url = "cgi-bin/listClient.pl";
  var promise = fetch(url);
  promise.then(response => response.text())
    .then(data => {
      var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      showList(xml);
  }).catch(error => {
    console.log('Error:', error);
  });
}

function showList(response) {
  if(response.getElementsByTagName('dni')[0]){
    console.log("Error");
    let client = response.getElementsByTagName('client');
    let firstName = response.getElementsByTagName('firstName');
    let lastName = response.getElementsByTagName('lastName');
    let dni = response.getElementsByTagName('dni');
    let country = response.getElementsByTagName('country');
    let isHere = response.getElementsByTagName('isHere');

    let html = "<h1>Lista de Clientes</h1>";
    html += `<hr size="8px" color="black">`;
    for(let i=0; i<client.length; i++){
      if(response.getElementsByTagName('firstName')[i].textContent){
        console.log(title[i].textContent);
        html += firstName.textContent+" "+lastName.textContent+" "+dni.textContent+" "+country.textContent+" "+isHere.textContent+`
          <button class="buttonMini" onclick=doremoveClient("`+dni.textContent+`")>Eliminar Cliente</button>
          <button class="buttonMini" onclick=doeditClient("`+dni.textContent+`")>Editar Cliente</button>
          <br><br>`;
      }
    }
    document.getElementById('main').innerHTML = html;
  }else{
    document.getElementById('main').innerHTML = "<h1 style=color:red;>No existe clientes.</h1>";
  }
}

