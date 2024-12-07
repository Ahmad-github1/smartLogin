// function validateName ()
// function ValidateEmail ()
// function validatePassword ()
// function duplicateName ()
// function duplicateEmail ()
// function signUp ()
// function login () 
// function logout()
// function checkIfEmpty()


// Initialize DOM element selectors
var nameInput = document.getElementById('nameInput');
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput'); 
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');

// Regex patterns
const nameRegex = /^[a-zA-Z]{1,12}$/;  
const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/; 

// Declared only variables
var allUsers;
var userAccount;
var username;



// retrive the allUsers data from localStorage

if ( localStorage.getItem('users') ) { // Returns a string if the key exists, a truthy value.

  allUsers = JSON.parse(localStorage.getItem('users'));
}
else {
  allUsers = [];
}







// regex Validation Functions

function validateName () {
  
  if ( nameRegex.test(nameInput.value) ) {
    nameInput.classList.add('is-valid');
    nameInput.classList.remove('is-invalid');
    document.getElementById('nameMsg2').classList.add('d-none');
    return true
  }

  else {
    document.getElementById('nameMsg2').classList.remove('d-none');
    nameInput.classList.add('is-invalid');
    return false
    
  }
}


function ValidateEmail () {

  if ( emailRegex.test(emailInput.value) ) {

    emailInput.classList.add('is-valid');
    emailInput.classList.remove('is-invalid');
    document.getElementById('mailMsg2').classList.add('d-none');
    return true;
  }
  else {
    document.getElementById('mailMsg2').classList.remove('d-none');
    emailInput.classList.add('is-invalid');
    return false;
  }
}


function validatePassword () {

  if ( passwordRegex.test(passwordInput.value) ) {

    passwordInput.classList.add('is-valid');
    passwordInput.classList.remove('is-invalid');
    document.getElementById('passMsg').classList.add('d-none');
    return true;
  }
  else {
    document.getElementById('passMsg').classList.remove('d-none');
    passwordInput.classList.add('is-invalid');
    return false;
  }
}







// functions check duplication
function duplicateName () {

  for ( i = 0; i < allUsers.length; i++ ) {

    if ( nameInput.value === allUsers[i].name ) {
      document.getElementById('nameMsg1').classList.remove('d-none');
      return false; // Exit immediately if a duplicate is found
    }
  }  

  // If no duplicate is found
  document.getElementById('nameMsg1').classList.add('d-none');
  return true;
     
}


function duplicateEmail () {
  for ( i = 0; i < allUsers.length; i++ ) {

    if ( emailInput.value === allUsers[i].email ) {
      document.getElementById('mailMsg1').classList.remove('d-none')
      return false // Exit immediately if a duplicate is found
    }
  }
    
  // If no duplicate is found
  document.getElementById('mailMsg1').classList.add('d-none');
  return true;
  
}




function signUp () {
  if ( duplicateName () && duplicateEmail () ) {

    userAccount = {
      name : nameInput.value.trim(),
      email : emailInput.value.trim(),
      password : passwordInput.value
    }

    allUsers.push(userAccount);
    //console.log(allUsers);
    document.getElementById('ifSuccess').classList.remove('d-none');

    //save allUsers [] in localStorage
    localStorage.setItem('users', JSON.stringify(allUsers));
  }

}




// checkIfEmpty()  Check if Login Fields Are Empty 
//console.log(typeof(document.getElementById('loginEmail').value)); //string

function checkIfEmpty() {
  // Check if either field is empty
  if (loginEmail.value.trim() === '' || loginPassword.value.trim() === '') {
    document.getElementById('emptyMsg').classList.remove('d-none');
    return false; // Indicates validation failed
  } else {
    document.getElementById('emptyMsg').classList.add('d-none');
    return true; // Indicates validation passed
  }
}


// Login Function
function login () {
  if ( checkIfEmpty() ) {

    for ( i = 0; i < allUsers.length; i++) {
      
      if (loginEmail.value.trim() === allUsers[i].email  && loginPassword.value.trim() === allUsers[i].password) {
        
        localStorage.setItem('loggedUser', allUsers[i].name)
        document.getElementById('incorrectMsg').classList.add('d-none');
        
        //window.location.href is a property in JavaScript represents the URL of the current page.
        window.location.href = './home.html';

      } else {
        document.getElementById('incorrectMsg').classList.remove('d-none');
      }
    }
  }
}





// retrive loggedUser data from localStorage to set welcome msg in Home page
username = localStorage.getItem('loggedUser');
if (username) {
  document.getElementById('username').innerHTML = "Welcome " + username
}


// Logout Function
function logout() {
  localStorage.removeItem('loggedUser');
  window.location.href = './index.html' // Redirect to login page or home
}
