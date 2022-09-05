const addNewUserModal = document.getElementById("add_user");

const imeKorisnika = document.querySelector("input[name = 'ime_korisnika']");
const prezimeKorisnika = document.querySelector(
  "input[name = 'prezime_korisnika']"
);
const visinaKorisnika = document.querySelector(
  "input[name = 'visina_korisnika']"
);
const tezinaKorisnika = document.querySelector(
  "input[name = 'tezina_korisnika']"
);

let user = {
  idKorisnika: null,
  imeKorisnika: null,
  prezimeKorisnika: null,
  visinaKorisnika: null,
  tezinaKorisnika: null,
};

function fillUserInfo() {
  imeKorisnika.value = user.imeKorisnika;
  prezimeKorisnika.value = user.prezimeKorisnika;
  visinaKorisnika.value = user.visinaKorisnika;
  tezinaKorisnika.value = user.tezinaKorisnika;
}

function mapUserInputs() {
  user.imeKorisnika = imeKorisnika.value;
  user.prezimeKorisnika = prezimeKorisnika.value;
  user.visinaKorisnika = parseInt(visinaKorisnika.value);
  user.tezinaKorisnika = parseInt(tezinaKorisnika.value);
}
