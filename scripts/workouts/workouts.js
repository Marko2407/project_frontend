const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');
const searchEnter = document.getElementById('search');
const searchInput = searchEnter.elements['search'];
const blokIcon = document.getElementById('blok-icon');
const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');

let number = 0;
let items = '';

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

// BLOKOVI S VJEŽBAMA
const blokVjezbi = document.getElementById('row');
const uuid = Cookies.get('uuid');
console.log(uuid);

async function getWeeklyWorkouts(weeklyOffset) {
  JsLoadingOverlay.show();
  date = subtractWeeks(weeklyOffset);

  document.getElementById('blok-proba').innerHTML = ``;
  const workouts = await queryFetch(GET_WORKOUT_FOR_SELECTED_WEEK_QUERY, {
    date: date.toString(),
    userId: uuid,
  });

  let list = workouts.data.getWorkoutForSelectedWeek;
  if (list != 0) {
    list.forEach((day) => {
      createWorkoutsElement(day);
    });
  } else {
    console.log(EMPTY);
    document.getElementById('blok-proba').innerHTML = noWorkoutView(
      NO_WORKOUTS_AVAILABLE
    );
  }
  JsLoadingOverlay.hide();
}

function getWorkoutBySearch(searchInput) {
  if (searchInput != '') {
    blokIcon.classList.add('hide-blok');
    blokIcon.classList.remove('show-blok');
    console.log(searchInput);
    return queryFetch(GET_WORKOUT_BY_SEARCH_QUERY, {
      searchInput: searchInput,
      userId: uuid,
    }).then((res) => {
      return res.data;
    });
  } else {
    blokIcon.classList.remove('hide-blok');
    blokIcon.classList.add('show-blok');
    getWeeklyWorkouts(number);
    console.log(EMPTY);
  }
}

//Kreiranje eventListenera
function createClickListeners() {
  leftArrow.addEventListener('click', async (e) => {
    e.preventDefault();
    number--;
    getWeeklyWorkouts(number);
  });

  rightArrow.addEventListener('click', async (e) => {
    e.preventDefault();
    number++;
    getWeeklyWorkouts(number);
  });

  searchEnter.addEventListener('submit', async (e) => {
    e.preventDefault();
    JsLoadingOverlay.show();
    const getWorkoutBySearchInput = await getWorkoutBySearch(searchInput.value);
    console.log(getWorkoutBySearchInput);
    if (getWorkoutBySearchInput.getWorkoutBySearchInput != null) {
      renderSearchResultView(getWorkoutBySearchInput.getWorkoutBySearchInput);
    }
    JsLoadingOverlay.hide();
  });
}
//Kreiranje UI-a
function renderSearchResultView(searchResult) {
  //isprazni div
  document.getElementById('blok-proba').innerHTML = ``;
  if (searchResult != 0) {
    searchResult.forEach((day) => {
      createWorkoutsElement(day);
    });
  } else {
    //nema rezultata
    console.log(EMPTY);
    document.getElementById('blok-proba').innerHTML = noWorkoutView(NOT_FIND);
  }
}

function createWorkoutsElement(workouts) {
  const workoutContainer = document.createElement('workout-weekly-info');
  workoutContainer.workoutWeeklyInfo = workouts;
  document.getElementById('blok-proba').appendChild(workoutContainer);
}

function init() {
  getWeeklyWorkouts(0);
}

if (uuid != undefined) {
  //First method to initiate when page open
  init();
  createClickListeners();
} else {
  location.assign('login.html');
  // odvedi na login
}
