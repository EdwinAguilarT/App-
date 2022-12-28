var userKey = ' ';

function showWelcome(){
    document.getElementById("error").className = "noerror"; 
  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
    <h2>Bienvenido `+ userKey +`</h2>
    <br>
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
  document.getElementById('main').innerHTML = html;
}

function showMenuUserLogged(){
  let html = `<ul>
    <li>
      <a onclick='showWelcome()'>Inicio</a>
    </li>
    <li>
      <a onclick='doList()'>Clientes listados</a>
    </li>
    <li>
      <a onclick='showaddClient()' class='rigthAlign'>Nuevo Cliente</a>
    </li>
    </ul>
    `;
  document.getElementById('menu').innerHTML = html;
}

function showRegister(){
    document.getElementById("error").className = "noerror"; 
  let html = `
  <h1>Registro</h1>
  <hr size="8px" color="black"><br>
  <div class="login">
      <div class="form">
        <form>
          <input type="text" placeholder="Usuario..." name="user" id="user" required=""><br>
          <input type="password" placeholder="Contraseña..." name="password" id="password" required=""><br>
          <input type="password" placeholder="Confirmar contraseña..." name="password2" id="password2" required=""><br>
          <a class="input" onclick='checkRegister()'>Registrarse</a>
        </form>
      </div>
    </div>
  `;
  document.getElementById('main').innerHTML = html;
}

function checkRegister() {
  let user = document.getElementById("user").value;
  let password = document.getElementById("password").value;
  let password2 = document.getElementById("password2").value;  

  if (password == password2) {
    document.getElementById("error").className = "noerror"
    doRegister(user, password);    
  } else {
    document.getElementById("error").textContent = "Las contraseñas no coinciden";
    document.getElementById("error").className = "error"; 
  } 
}

function doRegister(user, passw) {
  if(user && passw){
    document.getElementById("error").className = "noerror"; 
    var url = "cgi-bin/register.pl?user="+user+"&password="+passw;
    var promise = fetch(url);
    promise.then(response => response.text())
      .then(data => {
        var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        responseLogin(xml);
    }).catch(error => {
      console.log('Error:', error);
    });
  }else{
    document.getElementById("error").textContent = "Ingrese los datos correctament";
    document.getElementById("error").className = "error"; 
  }
}

function showLogin(){
    document.getElementById("error").className = "noerror"; 
  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Login</h1>
  <hr size="8px" color="black"><br>
  <div class="login">
      <div class="form">
        <form class="registro">
          <input type="text" placeholder="Usuario..." name="user" id="user" required=""><br>
          <input type="password" placeholder="Contraseña..." name="password" id="password" required=""><br>
          <a class="input" onclick='doLogin()'>Ingresar</a>
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
    document.getElementById("error").className = "noerror";
    var url = "cgi-bin/login.pl?user="+name+"&password="+pass;
    var promise = fetch(url);
    promise.then(response => response.text())
      .then(data => {
        var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        responseLogin(xml);
    }).catch(error => {
      console.log('Error:', error);
    });
  }else{
    document.getElementById("error").textContent = "Datos no válidos";
    document.getElementById("error").className = "error";
  }
}

function responseLogin(xml){
  if(xml.getElementsByTagName('admin')[0]){
    document.getElementById("error").className = "noerror";
    userKey = xml.childNodes[0].childNodes[1].textContent;
    showLoginSuccess();
  }else{
    document.getElementById("error").textContent = "Datos no válidos";
    document.getElementById("error").className = "error";
  }
}

function showLoginSuccess(){
    document.getElementById("error").className = "noerror"; 
  showWelcome();
  showMenuUserLogged();
}

function showaddClient(){
    document.getElementById("error").className = "noerror"; 
  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Nuevo cliente</h1>
  <hr size="8px" color="black" style="margin-bottom: 35px;"><br>
  <div class="form">
    <h2>Usuario: `+userKey+`</h2>
    <br>
    <input placeholder="Nombre..." type="text" id="firstName">
    <input placeholder="Apellido..." type="text" id="lastName">
    <input placeholder="Dni..." type="text" id="dni">
    <input placeholder="País..." type="text" id="country">
    <input placeholder="¿Está aquí?..." type="text" id="isHere">
    <input class="input" style="color:black;" type="submit" onclick="doaddClient()" value="Crear">
    <input class="input" style="color:black;" type="submit" onclick="doList()" value="Cancelar">
  </div>
  <div id="error">
  </div>
  `;
  document.getElementById('main').innerHTML = html;
}

function doaddClient(){
  document.getElementById("error").className = "noerror"; 
  let firstName = document.getElementById('firstName').value;  
  let lastName = document.getElementById('lastName').value;  
  let dni = document.getElementById('dni').value;  
  let country = document.getElementById('country').value;  
  let isHere = document.getElementById('isHere').value;

  if(firstName && lastName && dni && country && isHere){
    document.getElementById("error").className = "noerror";
    var url = "cgi-bin/addClient.pl?firstName="+firstName+"&lastName="+lastName+"&dni="+dni+"&country="+country+"&isHere="+isHere;
    var promise = fetch(url);
    promise.then(response => response.text())
      .then(data => {
        var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
        responseAddClient(xml);
    }).catch(error => {
      console.log('Error:', error);
    });
  } else{
    document.getElementById("error").textContent = "Ingrese los datos correctamente";
    document.getElementById("error").className = "error";
  }
}

function responseAddClient(response){
  sml = response;
  let firstName = response.childNodes[0].childNodes[1].textContent;
  let lastName = response.childNodes[0].childNodes[3].textContent;
  let dni = response.childNodes[0].childNodes[5].textContent;
  let country = response.childNodes[0].childNodes[7].textContent;
  let isHere = response.childNodes[0].childNodes[9].textContent;

  if(typeof firstName != 'undefined' && typeof lastName != 'undefined') {
    document.getElementById("error").className = "noerror";
    let html ="<h1>Cliente agregado/modificado correctamente</h1>\n" +"<h2>Nombre: " + firstName + "</h2>";
    html += "<h2>Apellido: " + lastName + "</h2>";
    html += "<h2>DNI: " + dni + "</h2>";
    html += "<h2>País: " + country + "</h2>";
    html += "<h2>¿Está aquí?: " + isHere + "</h2>";
    document.getElementById("main").innerHTML = html;
  } else {
    document.getElementById("error").textContent = "Ingrese los datos correctamente";
    document.getElementById("error").className = "error";
  }
}

function doremoveClient(dni){
  var url = "cgi-bin/removeClient.pl?dni="+dni;
  var promise = fetch(url);
  promise.then(response => response.text())
    .then(data => {
      doList();
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
      respondEditClient(xml);
  }).catch(error => {
    console.log('Error:', error);
  }); 
}

function respondEditClient(xml) {
  response = xml;

  let firstName = xml.childNodes[0].childNodes[1].textContent;
  let lastName = xml.childNodes[0].childNodes[3].textContent;
  let dni = xml.childNodes[0].childNodes[5].textContent;
  let country = xml.childNodes[0].childNodes[7].textContent;
  let isHere = xml.childNodes[0].childNodes[9].textContent;

  let html = `<link rel="stylesheet" type="text/css" href="css/style.css">
  <h1>Actualizar a cliente</h1>
  <hr size="8px" color="black"><br>
  <br>
  <div class="form">
    <input type="text" id="firstNameUpdate" name="firstNameUpdate" value=`+ firstName +`>
    <input type="text" id="lastNameUpdate" name="lastNameUpdate" value=`+ lastName +`>
    <input type="text" id="dniUpdate" name="dniUpdate" value=`+ dni +`>
    <input type="text" id="countryUpdate" name="countryUpdate" value=`+ country +`>
    <input type="text" id="isHereUpdate" name="isHereUpdate" value=`+ isHere +`>
    <br>
    <input class="input" style="color:black;" type="submit" value="Actualizar"  onclick="doUpdate(`+dni+`)">
  </div>
  `;
  document.getElementById('main').innerHTML = html;
}

function doUpdate(dni){

  let firstName = firstNameUpdate.value;
  let lastName = lastNameUpdate.value;
  let newdni = dniUpdate.value;
  let country = countryUpdate.value;
  let isHere = isHereUpdate.value;

  var url = "cgi-bin/editClient.pl?firstName="+firstName+"&lastName="+lastName+"&dni="+dni+"&dni2="+newdni+"&country="+country+"&isHere="+isHere;
  var promise = fetch(url);
  promise.then(response => response.text())
    .then(data => {
      console.log(data);
      var xml = (new window.DOMParser()).parseFromString(data, "text/xml");
      console.log(xml);
      responseAddClient(xml);
  }).catch(error => {
    console.log('Error:', error);
  });
}

function doList(){
    document.getElementById("error").className = "noerror"; 
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
    document.getElementById("error").className = "noerror"; 

  if(response.getElementsByTagName('dni')[0]){
    let client = response.getElementsByTagName('client');
    let firstName = response.getElementsByTagName('firstName');
    let lastName = response.getElementsByTagName('lastName');
    let dni = response.getElementsByTagName('dni');
    let country = response.getElementsByTagName('country');
    let isHere = response.getElementsByTagName('isHere');

    let html = "<h1>Lista de Clientes</h1>";
    html += `<hr size="8px" color="black"><br>`;
    html += `<table class="table">
    <tr>
    <th>Nombre</th>
    <th>Apellido</th>
    <th>DNI</th>
    <th>País</th>
    <th>¿Está aquí?</th>
    `;
    for(let i=0; i<client.length; i++){
      if(response.getElementsByTagName('firstName')[i].textContent){
        html +=`<tr>
        `+`<td>`+firstName[i].textContent+"</td> <td>"+lastName[i].textContent+"</td> <td>"+dni[i].textContent+"</td> <td>"+country[i].textContent+"</td> <td>"+isHere[i].textContent+`</td>
          <td><button class="input" onclick=doremoveClient("`+dni[i].textContent+`")>Eliminar Cliente</button>
          <button class="input" onclick=doeditClient("`+dni[i].textContent+`")>Editar Cliente</button></td>`;
      }
    }
    html += "</table>";
    document.getElementById('main').innerHTML = html;
  }else{
    let html = "<h1></h1>";
    document.getElementById('main').innerHTML = html;
    document.getElementById("error").textContent = "No existen clientes";
    document.getElementById("error").className = "error";
  }
}

