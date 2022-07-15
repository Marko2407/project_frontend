const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');
const userModalContainer = document.getElementById('user_modal_container');

let list = [];

async function getTodayWorkouts() {
  const workouts = await queryFetch(`
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
    `);
  list = workouts.data.getTodayWorkouts;
  let workoutListCurrentDay = [];
  if (list.length !== 0) {
    console.log(list);
    let workoutNames = list.map(function (workoutName) {
      return ` ${workoutName.title}`;
    });
    workoutListCurrentDay.push(list[0].day, workoutNames);

    console.log(workoutListCurrentDay);

    workouts.data.getTodayWorkouts.forEach((data) => {
      // console.log(data);

      // IME TRENUTNOG DANA
      document.getElementById('trenutni-dan').innerHTML = `
      ${list[0].day}
  `;

      // VJEŽBE U TRENUTNOM DANU
      document.getElementById('container-vjezbe').innerHTML = `
    <ul>
      ${generateListItems(list)}
    </ul>
  `;
    });
  } else {
    // UBACITI NEKI POPUP ILI SLICNO TIPA ALERT
    console.log(EMPTY_DATA);
  }
}

async function getCurrentUser() {
  const user = await queryFetch(`
  query GetUser {
    getUser {
      id
      firstName
      lastName
      weight
      height
    }
  }
    `);
  console.log(user);
  if (user.data.getUser != null) {
    console.log('Postoji korisnik' + JSON.stringify(user.data.getUser));

    let userBlok = document.getElementById('blok-podaci');
    userBlok.innerHTML = `
<div class="blok-podaci__info">
  <ul>
    <li><h3 class="blok-podaci__user-name">${user.data.getUser.lastName} ${user.data.getUser.firstName}</h3></li>
    <li>${user.data.getUser.height} cm</li>
    <li>${user.data.getUser.weight} kg</li>
  </ul> 
</div>
<div class="blok-podaci__gumbi">
  <button class="btn" id="user_edit">Promijeni</button>
  <br />
  <button class="btn" id="user_delete">Izbriši</button>
</div>

`;

    return true;
  } else {
    console.log(NO_CREATED_USER);
    return false;
  }
}

async function createNewUser(user) {
  console.log(user);
  await queryFetch(
    ` mutation CreateUser($firstName: String, $lastName: String, $weight: Int, $height: Int) {
      createUser(firstName: $firstName, lastName: $lastName, weight: $weight, height: $height) {
        firstName
        lastName
        weight
        height
      }
    }
         `,
    {
      firstName: user.imeKorisnika,
      lastName: user.prezimeKorisnika,
      height: user.visinaKorisnika,
      weight: user.tezinaKorisnika,
    }
  );
}

async function createNewWorkout(workout) {
  console.log(workout);
  await queryFetch(
    `
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
         `,
    {
      title: workout[0],
      description: workout[3],
      reps: workout[1],
      series: workout[2],
    }
  );
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
  return fetch('http://localhost:4000/graphql/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}

// MODAL
const openModal = document.getElementById('open');
const workoutModalContainer = document.getElementById('modal_container');
const closeWorkoutModal = document.getElementById('close');
const closeUserModal = document.getElementById('close_user_modal');

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

  const listOfCreatedWorkout = [firstWorkout, secondWorkout, thirdWorkout];

  for (let i = 0; i < listOfCreatedWorkout.length; i++) {
    if (listOfCreatedWorkout[i][0] !== '') {
      createNewWorkout(listOfCreatedWorkout[i]);
    } else {
      console.log('Please enter Title');
    }
  }
  location.reload();
});

addNewUserModal.addEventListener('click', async (e) => {
  e.preventDefault();
  const user = {
    imeKorisnika: imeKorisnika.value,
    prezimeKorisnika: prezimeKorisnika.value,
    visinaKorisnika: parseInt(visinaKorisnika.value),
    tezinaKorisnika: parseInt(tezinaKorisnika.value),
  };

  if (user.imeKorisnika !== '' || user.prezimeKorisnika !== '') {
    await createNewUser(user);
  } else {
    console.log('Please enter User info');
  }

  location.reload();
});

// PRIKAZ VJEZBI U TRENUTNOM DANU
function generateListItems(argument) {
  let items = '';
  for (let i = 0; i < argument.length; i++) {
    items += `<li>${argument[i].title}</li>`;
  }
  return items;
}

//Na kreiranju stranice
init();

//Konstante
const NO_CREATED_USER = 'Nema kreiranog korisnika';
const CREATED_USER = 'Postoji korisnik';
const EMPTY_DATA = 'Nema podataka';
