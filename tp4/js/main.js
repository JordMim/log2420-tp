var active='mission';
function showmenu(id){
  if (active===id){
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
