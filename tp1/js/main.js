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
  window.location.href="index.html"
}
function show(id){
  document.getElementById(id).style.display="block";
}


function check_pass() {
  var pass = document.formulaire.password.value;
  var confPass = document.formulaire.confPassword.value
  var passvalidation=/^(?=.*\d)(?=.*[a-zA-Z])/;


  if (pass === confPass && pass!=="" && confPass!=="" && pass.match(passvalidation)) {
    document.getElementById('send').disabled = false;
    document.formulaire.password.style.borderBottom="3px solid green";
    document.formulaire.confPassword.style.borderBottom="3px solid green";
  }
  else {
    alert("Le mot de pass ne correspond pas ou pas de mélange de lettres et chiffres!");
    document.formulaire.password.style.borderBottom="3px solid red";
    document.formulaire.confPassword.style.borderBottom="3px solid red";
  }
}


