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
    var url = "cgi-bin/addClient.pl?"
  }


}

function doremoveClient(){

}

function doeditClient(){

}

function dolistClient(){

}
