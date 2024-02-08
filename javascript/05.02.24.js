let submit = document.querySelector(`#submit`);
submit.addEventListener(`click`, Save);

function Save() {
  //alert(`hai`)
  let username = document.getElementById(`inp_username`);
  let email = document.getElementById(`inp_email`);
  let firstname = document.getElementById(`inp_firstname`);
  let lastname = document.getElementById(`inp_lastname`);
  let age = document.getElementById(`inp_age`);

  let Userdata = new User(
    username.value,
    email.value,
    firstname.value,
    lastname.value,
    age.value
  );

  //if (Userdata.username != "" Userdata.email != "" ) {
  if (all_inp_ok()) {
    console.log(Userdata);
    // se poat verifica daca user are minimul de litere pentru a selecta mai multe elemente se poate adauga in if  !validare_lungime_input(username)||!validare_lungime_input(emali) si tot asa
    // sau se poat adauga mai multe if complete
    // if (!validare_lungime_input(username)) {
    // alert("completeaza username");
    // return true;
    //}
    //if (!validare_lungime_input(email)) {
    //alert("completeaza username");
    //  return true;
    // }
    //if (!validare_lungime_input(firstname)) {
    //alert("completeaza username");
    // return true;
    // }
    //if (!validare_lungime_input(lastname)) {
    //alert("completeaza username");
    // return true;

    let bulltest = false;
    bulltest =
      validare_lungime_input(username) &&
      validare_lungime_input(email) &&
      validare_lungime_input(firstname) &&
      validare_lungime_input(lastname);
    console.log(bulltest);
    if (!bulltest) {
      return true;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
      console.log("email is good");
      return true;
    }

      
      if (username_exists(username.value)) {
          alert ("user existent ")
      }
      
      
      
      
    let users = [];
    users = JSON.parse(localStorage.getItem(`user`));
    if (!users) {
      users = [];
    }

    users.push(Userdata);

    localStorage.setItem(`user`, JSON.stringify(users));
    clearInput();

    //   username.value = "";
    //   email.value = "";
    //   firstname.value = "";
    //   lastname.value = "";
      //   age.value = "";
      
//asa te muti dupa o pagina pe alta 
window.location.href=`logare.html`


  } else {
    alert("completeaza tot ");
    }
    






}

// verifica daca este completat tot
function all_inp_ok() {
  let inputs = document.querySelectorAll(`input`);
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      return false;
    }
  }
  return true;
}

function clearInput() {
  let inputs = document.querySelectorAll(`input`);
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function User(username, email, firstname, lastname, age) {
  this.username = username;
  this.email = email;
  this.firstname = firstname;
  this.lastname = lastname;
  this.age = age;
}

//continuare 07/02.24

function validare_lungime_input(input) {
  let valoare = input.value;
  if (valoare.length >= 3) {
    input.style.border = "1px solid black";
    return true;
  }
  input.style.border = "1px solid red";
  return false;
}

function username_exists(username) {
  let Storage_users = localStorage.getItem(`user`);
  if (Storage_users) {
    Storage_users = JSON.parse(Storage_users);
    for (let elemente of Storage_users) {
      if (elemente.username.toLowerCase() == username.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
  return false;
}

function username_email(username) {
  let Stora_email = localStorage.getItem(`users`);
  if (Stora_email) {
    Storage_users = JSON.parse(Storage_email);
    for (let elemente of Storage_email) {
      if (elemente.email == users) {
        return true;
      }
    }
    return false;
  }
  return false;
}
