const userModalContainer = document.getElementById("user_modal_container");
const openWorkoutModal = document.getElementById("open");
const workoutModalContainer = document.getElementById("modal_container");
const closeWorkoutModal = document.getElementById("close");
const closeUserModal = document.getElementById("close_user_modal");
const userBlok = document.getElementById("blok_korisnik_info");

const unesiKorake = document.getElementById("unesi_korake");
const inputKoraci = document.querySelector("input[name = 'koraci']");

const grafInfo = document.getElementById("blok-graf_info");
const blokGraf = document.getElementById("blok-graf");

let yValues = [];

async function getUser() {
  const response = await getCurrentUser();
  console.log(response);
  if (response != null) {
    console.log(CREATED_USER + JSON.stringify(user));
    const container = document.getElementById("blok-podaci");
    const userContainer = document.createElement("user-info");
    userContainer.userI = user;
    container.appendChild(userContainer);
    // userBlok.innerHTML = createUserRowView(user);
    return true;
  } else {
    return false;
  }
}

async function getActivityForToday() {
  const response = await getTodayActivity();
  if (response != null) {
    const container = document.getElementById("blok-graf");
    const userContainer = document.createElement("graph-info");
    userContainer.graphInfo = response;
    container.appendChild(userContainer);
    //kreirati komponentu
    //grafInfo.innerHTML = createActivityRowView(response);
  } else {
    await createNewTodayActivity(0);
  }
}

async function getWorkoutsForToday() {
  const response = await getTodayWorkouts();
  renderWorkoutResponse(response);
}

async function getActivitiesWeekly() {
  const response = await getWeeklyActivities();
  response.activities.forEach((element) => {
    console.log(element);
    yValues.push(element.totalSteps);
  });

  const container = document.getElementById("blok-graf");
  const userContainer = document.createElement("graph-info-weekly");
  userContainer.yValues = yValues;
  container.appendChild(userContainer);
}

async function updateSteps(koraci) {
  await updateTodaySteps(koraci);
  yValues = [];
  await getActivityForToday();
  await getActivitiesWeekly();
}

async function init() {
  const isUserExist = await getUser();
  if (isUserExist) {
    getWorkoutsForToday();
    getActivityForToday();
    getActivitiesWeekly();
  } else {
    console.log(NO_CREATED_USER);
    userModalContainer.classList.add("show");
    //Open modal for creating user
  }
}

function renderWorkoutResponse(response) {
  document.getElementById("trenutni-dan").innerHTML = `<card-title title="${
    daysInWeek[new Date().getUTCDay()]
  }"></card-title>`;
  if (response.length !== 0) {
    console.log(response);
    document.getElementById("container-vjezbe").innerHTML =
      createWorkoutRowView(response);
  } else {
    document.getElementById("container-vjezbe").innerHTML =
      createRowWithEmptyDataView();
    // UBACITI NEKI POPUP ILI SLICNO TIPA ALERT
    console.log(EMPTY_DATA);
  }
}

// MODAL
function createClickListeners() {
  openWorkoutModal.addEventListener("click", () => {
    workoutModalContainer.classList.add("show");
  });

  closeWorkoutModal.addEventListener("click", () => {
    workoutModalContainer.classList.remove("show");
  });

  closeUserModal.addEventListener("click", () => {
    userModalContainer.classList.remove("show");
  });

  addNewWorkoutsModal.addEventListener("click", async (e) => {
    e.preventDefault();
    const listOfCreatedWorkout = createWorkoutList();
    for (let i = 0; i < listOfCreatedWorkout.length; i++) {
      //ako title nije prazan, kreiraj novu vjezbu
      if (listOfCreatedWorkout[i][0] !== "") {
        await createNewWorkout(listOfCreatedWorkout[i]);
      } else {
        //TODO('Add Alert to enter Title')
        console.log(PLEASE_ENTER_TITLE);
      }
    }
    location.reload();
  });

  addNewUserModal.addEventListener("click", async (e) => {
    e.preventDefault();
    mapUserInputs();
    if (user.idKorisnika == null) {
      if (user.imeKorisnika !== "" || user.prezimeKorisnika !== "") {
        await createNewUser(user);
      } else {
        console.log(PLEASE_ENTER_USER_INFO);
      }
    } else {
      await updateUser(user);
    }
    location.reload();
  });

  // unesiKorake.addEventListener("click", async (e) => {
  //   e.preventDefault();
  //   const koraci = parseInt(inputKoraci.value);
  //   console.log(koraci == NaN);
  //   if (!isNaN(koraci)) {
  //     await updateSteps(koraci);
  //   } else {
  //     console.log("Unesi korake");
  //   }
  // });
}

//Generiranje UI-a
function createUserRowView(user) {
  return `
  <ul>
    <li><card-title title= "${user.prezimeKorisnika} ${user.imeKorisnika}"></card-title></li>
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
  let items = "";
  argument.forEach((element) => {
    items += `<li>${element.title}</li>`;
  });
  return items;
}

function createActivityRowView(activity) {
  return `
  <ul>
    <li>
    <card-title title = "${getDayOnCroatian(activity.day)}" ></card-title>
   </li>
    <li>${activity.totalSteps}</li>
  </ul> 
`;
}

//Na kreiranju stranice
init();
createClickListeners();
