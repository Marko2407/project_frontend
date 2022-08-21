const userModalContainer = document.getElementById("user_modal_container");
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
  } else {
    await createNewTodayActivity(0);
  }
}

async function getWorkoutsForToday() {
  const response = await getWeeklyWorkouts();
  getActivitiesWeekly();
  renderWorkoutResponse(response);
}

async function getActivitiesWeekly() {
  const response = await getWeeklyActivities();
  response.activities.forEach((element) => {
    console.log(element);
    yValues.push(element.totalSteps);
  });

  const container = document.getElementById("blok-graf");
  const activityContainer = document.createElement("graph-info-weekly");
  activityContainer.yValues = { chartId: "#myChart", values: yValues };
  container.appendChild(activityContainer);
}

async function updateSteps(koraci) {
  await updateTodaySteps(koraci);
  location.reload();
}

async function init() {
  const isUserExist = await getUser();
  if (isUserExist) {
    getWorkoutsForToday();
    getActivityForToday();
  } else {
    console.log(NO_CREATED_USER);
    userModalContainer.classList.add("show");
    //Open modal for creating user
  }
}

function renderWorkoutResponse(response) {
  const container = document.getElementById("blok-vjezbe");
  const activityContainer = document.createElement("workout-info");
  activityContainer.workoutInfo = response;
  container.appendChild(activityContainer);
}

// MODAL
function createClickListeners() {
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
}

//Na kreiranju stranice
init();
createClickListeners();
