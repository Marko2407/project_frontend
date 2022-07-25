const userModalContainer = document.getElementById('user_modal_container');
const openModal = document.getElementById('open');
const workoutModalContainer = document.getElementById('modal_container');
const closeWorkoutModal = document.getElementById('close');
const closeUserModal = document.getElementById('close_user_modal');
const userBlok = document.getElementById('blok_korisnik_info');

const addNewWorkoutsModal = document.getElementById('add');
const addNewUserModal = document.getElementById('add_user');

const vj1 = document.querySelector("input[name = 'vj1']");
const vj2 = document.querySelector("input[name = 'vj2']");
const vj3 = document.querySelector("input[name = 'vj3']");

const s1 = document.querySelector("input[name = 's1']");
const s2 = document.querySelector("input[name = 's2']");
const s3 = document.querySelector("input[name = 's3']");

const r1 = document.querySelector("input[name = 'r1']");
const r2 = document.querySelector("input[name = 'r2']");
const r3 = document.querySelector("input[name = 'r3']");

const opisVj1 = document.querySelector("textarea[name = 'opisVj1']");
const opisVj2 = document.querySelector("textarea[name = 'opisVj2']");
const opisVj3 = document.querySelector("textarea[name = 'opisVj3']");

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

const daysInWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function createWorkoutList() {
  const firstWorkout = [
    vj1.value,
    parseInt(s1.value),
    parseInt(r1.value),
    opisVj1.value,
  ];
  const secondWorkout = [
    vj2.value,
    parseInt(s2.value),
    parseInt(r2.value),
    opisVj2.value,
  ];
  const thirdWorkout = [
    vj3.value,
    parseInt(s3.value),
    parseInt(r3.value),
    opisVj3.value,
  ];
  return [firstWorkout, secondWorkout, thirdWorkout];
}

function mapUserInputs() {
  user.imeKorisnika = imeKorisnika.value;
  user.prezimeKorisnika = prezimeKorisnika.value;
  user.visinaKorisnika = parseInt(visinaKorisnika.value);
  user.tezinaKorisnika = parseInt(tezinaKorisnika.value);
}

function fillUserInfo() {
  imeKorisnika.value = user.imeKorisnika;
  prezimeKorisnika.value = user.prezimeKorisnika;
  visinaKorisnika.value = user.visinaKorisnika;
  tezinaKorisnika.value = user.tezinaKorisnika;
}

async function getTodayWorkouts() {
  const workouts = await queryFetch(GET_TODAY_WORKOUT_QUERY);
  const reponse = workouts.data.getTodayWorkouts;
  document.getElementById('trenutni-dan').innerHTML =
    daysInWeek[new Date().getDay()];
  if (reponse.length !== 0) {
    console.log(reponse);
    document.getElementById('container-vjezbe').innerHTML =
      createWorkoutRowView(reponse);
  } else {
    document.getElementById('container-vjezbe').innerHTML =
      createRowWithEmptyDataView();
    // UBACITI NEKI POPUP ILI SLICNO TIPA ALERT
    console.log(EMPTY_DATA);
  }
}

async function getCurrentUser() {
  const userQuery = await queryFetch(GET_CURRENT_USER_QUERY);
  console.log(userQuery);
  if (userQuery.data.getUser != null) {
    user.idKorisnika = userQuery.data.getUser.id;
    user.imeKorisnika = userQuery.data.getUser.firstName;
    user.prezimeKorisnika = userQuery.data.getUser.lastName;
    user.visinaKorisnika = parseInt(userQuery.data.getUser.height);
    user.tezinaKorisnika = parseInt(userQuery.data.getUser.weight);

    console.log(CREATED_USER + JSON.stringify(user));
    userBlok.innerHTML = createActivityRowView(user);
    return true;
  } else {
    console.log(NO_CREATED_USER);
    return false;
  }
}

async function createNewUser(user) {
  console.log(user);
  await queryFetch(CREATE_NEW_USER_MUTATION, {
    firstName: user.imeKorisnika,
    lastName: user.prezimeKorisnika,
    height: user.visinaKorisnika,
    weight: user.tezinaKorisnika,
  });
}

async function updateUser(user) {
  console.log(user);
  await queryFetch(UPDATE_USER_MUTATION, {
    updateUserId: user.idKorisnika,
    firstName: user.imeKorisnika,
    lastName: user.prezimeKorisnika,
    height: user.visinaKorisnika,
    weight: user.tezinaKorisnika,
  });
}

async function deleteUser() {
  console.log(user);
  await queryFetch(DELETE_USER_MUTATION, { deleteUserId: user.idKorisnika });
}

async function createNewWorkout(workout) {
  console.log(workout);
  await queryFetch(CREATE_NEW_WORKOUT_MUTATION, {
    title: workout[0],
    description: workout[3],
    reps: workout[1],
    series: workout[2],
  });
}

async function init() {
  const isUserExist = await getCurrentUser();
  if (isUserExist) {
    getTodayWorkouts();
  } else {
    userModalContainer.classList.add('show');
    //Open modal for creating user
  }
}

function queryFetch(query, variables) {
  return fetch(DEV_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}

// MODAL
function createClickListeners() {
  openModal.addEventListener('click', () => {
    workoutModalContainer.classList.add('show');
  });

  closeWorkoutModal.addEventListener('click', () => {
    workoutModalContainer.classList.remove('show');
  });

  closeUserModal.addEventListener('click', () => {
    userModalContainer.classList.remove('show');
  });

  addNewWorkoutsModal.addEventListener('click', async (e) => {
    e.preventDefault();
    const listOfCreatedWorkout = createWorkoutList();
    for (let i = 0; i < listOfCreatedWorkout.length; i++) {
      //ako title nije prazan, kreiraj novu vjezbu
      if (listOfCreatedWorkout[i][0] !== '') {
        createNewWorkout(listOfCreatedWorkout[i]);
        location.reload();
      } else {
        //TODO('Add Alert to enter Title')
        console.log(PLEASE_ENTER_TITLE);
      }
    }
  });

  addNewUserModal.addEventListener('click', async (e) => {
    e.preventDefault();
    mapUserInputs();
    if (user.idKorisnika == null) {
      if (user.imeKorisnika !== '' || user.prezimeKorisnika !== '') {
        await createNewUser(user);
      } else {
        console.log(PLEASE_ENTER_USER_INFO);
      }
    } else {
      await updateUser(user);
      location.reload();
    }
  });

  document.getElementById('user_edit').addEventListener('click', () => {
    fillUserInfo();
    userModalContainer.classList.add('show');
  });

  document
    .getElementById('user_delete')
    .addEventListener('click', async (e) => {
      await deleteUser();
      location.reload();
    });
}

//Generiranje UI-a
function createActivityRowView(user) {
  return `
  <ul>
    <li><h3 class="blok-podaci__user-name">${user.prezimeKorisnika} ${user.imeKorisnika}</h3></li>
    <li>${user.visinaKorisnika} cm</li>
    <li>${user.tezinaKorisnika} kg</li>
  </ul> 
`;
}

function createWorkoutRowView(workouts) {
  return `
    <ul>
      ${generateListItems(workouts)}
    </ul>
  `;
}

function createRowWithEmptyDataView(day) {
  return `
       <div class="blok-naslov">
         <p>${NO_WORKOUTS_AVAILABLE}</p>
       </div>
     `;
}

// PRIKAZ VJEZBI U TRENUTNOM DANU
function generateListItems(argument) {
  let items = '';
  argument.forEach((element) => {
    items += `<li>${element.title}</li>`;
  });
  return items;
}

//Konstante
const NO_CREATED_USER = 'Nema kreiranog korisnika';
const CREATED_USER = 'Postoji korisnik';
const EMPTY_DATA = 'Nema podataka';
const PLEASE_ENTER_USER_INFO = 'Please enter user info';
const PLEASE_ENTER_TITLE = 'Please enter Title';
const DEV_URL = 'http://localhost:4000/graphql/';
const NO_WORKOUTS_AVAILABLE = 'No workouts available';

//QUERIES AND MUTATIONS
const CREATE_NEW_WORKOUT_MUTATION = `
mutation CreateWorkout($title: String, $description: String, $dateCreated: String, $reps: Int, $series: Int) {
  createWorkout(title: $title,description: $description,dateCreated: $dateCreated,reps: $reps,series: $series) {
      id
      title
      description
      dateCreated
      day
      series
      reps
    }
  }
`;

const DELETE_USER_MUTATION = ` mutation DeleteUser($deleteUserId: ID) {
    deleteUser(id: $deleteUserId)
  }
`;

const UPDATE_USER_MUTATION = ` mutation UpdateUser($updateUserId: ID, $firstName: String, $lastName: String, $weight: Int, $height: Int) {
  updateUser(id: $updateUserId, firstName: $firstName, lastName: $lastName, weight: $weight, height: $height) {
      id
      firstName
      lastName
      weight
      height
    }
  }
`;

const CREATE_NEW_USER_MUTATION = ` mutation CreateUser($firstName: String, $lastName: String, $weight: Int, $height: Int) {
  createUser(firstName: $firstName, lastName: $lastName, weight: $weight, height: $height) {
      firstName
      lastName
      weight
      height
    }
  }
`;

const GET_CURRENT_USER_QUERY = `
  query GetUser {
    getUser {
      id
      firstName
      lastName
      weight
      height
    }
  }
`;

const GET_TODAY_WORKOUT_QUERY = `
  query {
      getTodayWorkouts {
        id
        day
        title
        description
        dateCreated
        series
        reps
        }
  }
`;

//Na kreiranju stranice
init();
createClickListeners();
