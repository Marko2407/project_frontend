// dohvati modal
const closeModal = document.getElementById('close');
const closeRegModal = document.getElementById('closeReg');
const buttonPrijava = document.getElementById('prijava');
const buttonRegistracija = document.getElementById('registracija');
const modalContainerPrijava = document.getElementById(
  'modal_container_prijava'
);
const modalContainerRegistracija = document.getElementById(
  'modal_container_registracija'
);

// dohvati inpute
let uuid = Cookies.get('uuid');

const userName = document.querySelector("input[name = 'username']");
const password = document.querySelector("input[name = 'password']");
const regUserName = document.querySelector("input[name = 'reg_username']");
const regPassword = document.querySelector("input[name = 'reg_password']");
const firstName = document.querySelector("input[name = 'firstName']");
const lastName = document.querySelector("input[name = 'lastName']");
const weight = document.querySelector("input[name = 'weight']");
const height = document.querySelector("input[name = 'height']");

const loginButton = document.getElementById('login');
const registerButton = document.getElementById('registerBtn');

if (uuid != undefined) {
  location.assign('index.html');
}

JsLoadingOverlay.setOptions({
  overlayBackgroundColor: '#666666',
  overlayOpacity: 0.6,
  spinnerIcon: 'ball-spin-clockwise',
  spinnerColor: '#000',
  spinnerSize: '2x',
  overlayIDName: 'overlay',
  spinnerIDName: 'spinner',
  offsetY: 0,
  offsetX: 0,
  lockScroll: false,
  containerID: null,
});

async function loginUser(username, password) {
  JsLoadingOverlay.show();
  const result = await loginUserQuery(username, password);
  console.log(result);
  if (result != null) {
    Cookies.set('uuid', result.id);
    console.log('uspjesna prijava');
    location.assign('index.html');
    //odvedi na pocetnu
  } else {
    console.log('neuspjesna prijava');
    alert('Krivo korisničko ime ili lozinku');
    // ili user ne postoji ili je krivi username ili password u biti prikazi unknown error
  }
  JsLoadingOverlay.hide();
}

async function registerUser() {
  JsLoadingOverlay.show();
  const result = await createNewUser(user);
  console.log(result);
  if (result != null) {
    Cookies.set('uuid', result.id);
    location.assign('index.html');
    //odvedi na pocetnu stranicu
  } else {
    alert('Greška ');
    // username vec postoji !
  }
  JsLoadingOverlay.hide();
}

function createClickListeners() {
  buttonPrijava.addEventListener('click', () => {
    modalContainerPrijava.classList.add('show');
  });
  buttonRegistracija.addEventListener('click', () => {
    modalContainerRegistracija.classList.add('show');
  });
  closeModal.addEventListener('click', () => {
    modalContainerPrijava.classList.remove('show');
  });
  closeRegModal.addEventListener('click', () => {
    modalContainerRegistracija.classList.remove('show');
  });
  loginButton.addEventListener('click', async (e) => {
    if ((userName.value && password.value) != '') {
      loginUser(userName.value, password.value);
    } else {
      alert('Unesite korisničko ime ili lozinku');
      console.log('Unesite korisničko ime ili lozinku');
    }
  });

  registerButton.addEventListener('click', async (e) => {
    if (
      (firstName.value &&
        lastName.value &&
        regUserName.value &&
        regPassword.value) != ''
    ) {
      mapUserInputs(
        firstName.value,
        lastName.value,
        height.value,
        weight.value,
        regUserName.value,
        regPassword.value
      );
      registerUser();
    } else {
      alert('Unesite potrebne podatke');
      console.log('Unesite potrebne podatke');
    }
  });
}

// set click listener on login btn to call loginUser function and to register new user
createClickListeners();
