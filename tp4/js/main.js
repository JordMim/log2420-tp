var active='mission';
function showmenu(id){
  if (active==id){
  }
  else{
    document.getElementById(id).style.display = "block";
    document.getElementById(active).style.display="none";
    active=id;
  }
}

function hide(id){
  document.getElementById(id).style.display="none";
  // window.location.href="index.html";
}


function show(id){
  document.getElementById(id).style.display="block";
}

function check_pass() {
  var pass = document.formulaire.password.value;
  var confPass = document.formulaire.confPassword.value;
  var passvalidation=/^(?=.*\d)(?=.*[a-zA-Z])/;

  if (pass === confPass && pass!=="" && confPass!=="" && pass.match(passvalidation)) {
    document.getElementById('send').disabled = false;
    document.formulaire.password.style.borderBottom="3px solid green";
    document.formulaire.confPassword.style.borderBottom="3px solid green";
    sendJSon()
  }
  else {
    alert("Le mot de pass ne correspond pas ou pas de mélange de lettres et chiffres!\n N'oubliez pas de cocher la case");
    document.formulaire.password.style.borderBottom="3px solid red";
    document.formulaire.confPassword.style.borderBottom="3px solid red";
  }
}

function sendJSon() {
  let getRequest = new Request("http://127.0.0.1:3000/", {method: 'GET'})

  fetch(getRequest)
    .then(response => response.json())
    .then(json => {
      console.log(json.users)
    });

  document.querySelector('#send').addEventListener('click', function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let json = {"name": "", "email": "", "password": ""};
    json.name = name;
    json.email = email;
    json.password = password;
    console.log(json)

    let postRequest = new Request("http://127.0.0.1:3000/", {method: 'POST', body: JSON.stringify(json)})

    fetch(postRequest)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
  });
}

function getJSON(path) {
  return fetch(path).then(response => response.json());
}

 function checkPassword(){
   getJSON('js/mock-db.json').then(json => {
    let user = json.users;
    let i = 0
    let trouve = false
    let email_test = document.getElementById('email_membre').value
    let password_test = document.getElementById('password_membre').value
    while(user[i] != undefined && !trouve)
    {
      if(user[i].email === email_test)
       {
         trouve = true
       }
       else
       {
         i++
       }
    }
    if(user[i] != undefined)
    {
      if(user[i].password === password_test)
      {
        return window.location.href = "pageFrigo.html"
      }
      else
      {
        return console.log("mauvais mot de passe")
      }
    }
    console.log("identifiant non trouve");
  })
}

window.onload = function onload(){
  getJSON('js/mock-db.json').then(json =>{
    let frigos = json.frigo
    let i = 0
    while(frigos[i] != undefined){
      addFrigo(frigos[i])
      i++
    }
  })
}

function addFrigo(frigo){
  const newDiv = document.createElement("div");
  const newBouttonNom = document.createElement("button");
  const newPAdresse = document.createElement("p");
  const newPDispo = document.createElement("p");
  const newPDistance = document.createElement("p");
  const newBool = document.createElement("p");

  const nom = document.createTextNode(frigo.nom);
  const adresse = document.createTextNode(frigo.adresse);
  const distance = document.createTextNode(frigo.distance);
  const dispo = document.createTextNode(frigo.disponibilite);
  const bool = document.createTextNode("notInitialized")

  newBouttonNom.appendChild(nom)
  newPAdresse.appendChild(adresse)
  newPDistance.appendChild(distance)
  newPDispo.appendChild(dispo);
  newBool.appendChild(bool)

  newDiv.append(newBouttonNom)
  newDiv.append(newPAdresse)
  newDiv.append(newPDistance)
  newDiv.append(newPDispo)
  newDiv.appendChild(newBool)

  newBool.style.display="none";

  newDiv.id=frigo.nom
  newBouttonNom.onclick=function func(){
    console.log(newBool.textContent);
    if(newBool.textContent === "notInitialized"){
      newBool.innerText = "initialized"
      creerRepas(frigo)
    } else {
      let id =
      document.getElementById(`${frigo.nom + "repas"}`).scrollIntoView("")
    }
  }
  const currentDiv = document.getElementById("allfrigos");
  document.body.insertBefore(newDiv, currentDiv);
}

function creerRepas(frigo){
  bool = true
  let i = 0
  console.log(frigo.nom)
  const newDiv = document.createElement("div")
  const newRepas = document.createElement("div");
  newDiv.id =frigo.nom + "repas";
  const currentDiv = document.getElementById("allrepas");
  document.body.insertBefore(newDiv, currentDiv);

  newDiv.appendChild(newRepas);
  while(frigo.repas[i] != undefined){
    repas(frigo.repas[i], newRepas);
    i++;
  }
}

function repas(repas, currentDiv){
  const newDiv = document.createElement("div");
  const newBouttonNom = document.createElement("button");
  const newPCategorie = document.createElement("p");
  const newPPeremption = document.createElement("p")
  const newImg = document.createElement("img")

  const nom = document.createTextNode(repas.nom);
  const categorie = document.createTextNode(repas.categorie);
  const peremption = document.createTextNode(repas.peremption);

  newBouttonNom.appendChild(nom)
  newPCategorie.appendChild(categorie)
  newPPeremption.appendChild(peremption);
  newImg.src=repas.image;

  newDiv.append(newBouttonNom)
  newDiv.append(newPCategorie)
  newDiv.append(newPPeremption)
  newDiv.append(newImg)

  let i = 0;
  while(repas.allergie[i] != undefined){
    const newPAllergie = document.createElement("p");
    const allergie = document.createTextNode(repas.allergie[i].nom);
    newPAllergie.appendChild(allergie);
    newDiv.append(newPAllergie);
    i++;
  }

  currentDiv.appendChild(newDiv)
  newDiv.id=repas.nom
  newBouttonNom.onclick=function func(){
    console.log(repas.nom)
  }
}







