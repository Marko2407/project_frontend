const userModalContainer = document.getElementById("user_modal_container");
const workoutModalContainer = document.getElementById("modal_container");
const closeWorkoutModal = document.getElementById("close");
const closeUserModal = document.getElementById("close_user_modal");
const userBlok = document.getElementById("blok_korisnik_info");

const unesiKorake = document.getElementById("unesi_korake");
const inputKoraci = document.querySelector("input[name = 'koraci']");

const grafInfo = document.getElementById("blok-graf_info");
const blokGraf = document.getElementById("blok-graf");

JsLoadingOverlay.setOptions({
  overlayBackgroundColor: "#666666",
  overlayOpacity: 0.6,
  spinnerIcon: "ball-spin-clockwise",
  spinnerColor: "#000",
  spinnerSize: "2x",
  overlayIDName: "overlay",
  spinnerIDName: "spinner",
  offsetY: 0,
  offsetX: 0,
  lockScroll: false,
  containerID: null,
});

JsLoadingOverlay.show();

let yValues = [];

let workoutResponse = null;
let activityWeeklyResponse = null;
let activityDailyResponse = null;

//Dohvacaju se svi podatci odjednom i prikazuju se tek kad su svi dohvaceni
async function init() {
  const isUserExist = await getUser();
  if (isUserExist) {
    const response =
      (await getWorkoutsForToday()) &&
      (await getActivitiesWeekly()) &&
      (await getActivityForToday());
    if (response) {
      renderData();
    }
  } else {
    console.log(NO_CREATED_USER);
    userModalContainer.classList.add("show");
  }
  JsLoadingOverlay.hide();
}

async function getUser() {
  const response = await getCurrentUser();
  console.log(response);
  if (response != null) {
    return true;
  } else {
    return false;
  }
}

async function getActivityForToday() {
  const response = await getTodayActivity();
  if (response != null) {
    if (response != null) {
      activityDailyResponse = response;
      return true;
    }
  } else {
    await createNewTodayActivity(0);
    return false;
  }
}

async function getWorkoutsForToday() {
  const response = await getTodayWorkouts();
  if (response != null) {
    workoutResponse = response;
    return true;
  } else {
    return false;
  }
}

async function getActivitiesWeekly() {
  const response = await getWeeklyActivities();
  if (response != null) {
    response.activities.forEach((element) => {
      console.log(element);
      yValues.push(element.totalSteps);
    });
    activityWeeklyResponse = response;
    return true;
  } else {
    return false;
  }
}

async function updateSteps(koraci) {
  await updateTodaySteps(koraci);
  location.reload();
}

function renderData() {
  renderUserResponse(user);
  renderWorkoutResponse(workoutResponse);
  renderActivityResponse(activityWeeklyResponse, activityDailyResponse);
}

function renderWorkoutResponse(response) {
  const container = document.getElementById("blok-vjezbe");
  const activityContainer = document.createElement("workout-info");
  activityContainer.workoutInfo = response;
  container.appendChild(activityContainer);
}

function renderActivityResponse(activityWeekly, activityDaily) {
  const container = document.getElementById("blok-graf");
  const userContainer = document.createElement("graph-info");
  userContainer.graphInfo = activityDaily;
  container.appendChild(userContainer);

  const activityContainer = document.createElement("graph-info-weekly");
  activityContainer.yValues = { chartId: "#myChart", values: yValues };
  container.appendChild(activityContainer);
}

function renderUserResponse(user) {
  console.log(CREATED_USER + JSON.stringify(user));
  const container = document.getElementById("blok-podaci");
  const userContainer = document.createElement("user-info");
  userContainer.userI = user;
  container.appendChild(userContainer);
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
    JsLoadingOverlay.show();
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
    JsLoadingOverlay.show();
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
