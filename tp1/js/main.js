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
  window.history.go(-10);
}


function check_pass() {
  var pass = document.formulaire.password.value;
  var confPass = document.formulaire.confPassword.value
  if (pass === confPass && pass!=="" && confPass!=="") {
    document.getElementById('send').disabled = false;
    document.formulaire.password.style.borderBottom="3px solid green";
    document.formulaire.confPassword.style.borderBottom="3px solid green";
  } else {
    document.formulaire.password.style.borderBottom="3px solid red";
    document.formulaire.confPassword.style.borderBottom="3px solid red";
  }
}
function validate(){
  var pass = document.formulaire.password.value;
  var passvalidation=/^(?=.*\d)(?=.*[a-zA-Z])/;
  if(pass.match(passvalidation)){
    document.getElementById('page_pop').style.display="block";
    document.getElementById('menu_mission').autofocus=false;

  }
  else{
    alert("Mélange de lettres et chiffres!");
    document.formulaire.password.style.borderBottom="3px solid red";
    document.formulaire.confPassword.style.borderBottom="3px solid red";
    return false;

  }
}

