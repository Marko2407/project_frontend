const workoutList = document.getElementById("workout-list");
const workoutTitle = document.getElementById("workoutNames");
const searchEnter = document.getElementById("search");
const searchInput = searchEnter.elements["search"];
const blokIcon = document.getElementById("blok-icon");
const leftArrow = document.getElementById("left");
const rightArrow = document.getElementById("right");

let number = 0;
let items = "";

// BLOKOVI S VJEŽBAMA
const blokVjezbi = document.getElementById("row");

async function getTodayWorkouts(weeklyOffset) {
  date = subtractWeeks(weeklyOffset);
  console.log(removeTime(new Date(parseInt(date))));
  document.getElementById("blok-proba").innerHTML = ``;
  const workouts = await queryFetch(GET_WORKOUT_FOR_SELECTED_WEEK_QUERY, {
    weeklyOffset: date.toString(),
  });

  console.log(workouts);
  let list = workouts.data.getWorkoutForSelectedWeek;
  if (list != 0) {
    list.forEach((day) => {
      const node = document.createElement("div");
      node.classList.add("blok");
      if (day.workouts.length != 0) {
        let dateCreated = removeTime(
          new Date(parseInt(day.workouts[0].dateCreated))
        );
        console.log(dateCreated);
        let date = createDateString(dateCreated);
        node.innerHTML = createRowWithAvailableDataView(
          day.day,
          date,
          day.workouts
        );
      } else {
        node.innerHTML = createRowWithEmptyDataView(day.day);
      }
      document.getElementById("blok-proba").appendChild(node);
    });
  } else {
    console.log(EMPTY);
    document.getElementById("blok-proba").innerHTML = noWorkoutView(
      NO_WORKOUTS_AVAILABLE
    );
  }
}

function getWorkoutBySearch(searchInput) {
  if (searchInput != "") {
    blokIcon.classList.add("hide-blok");
    blokIcon.classList.remove("show-blok");
    return queryFetch(GET_WORKOUT_BY_SEARCH_QUERY, {
      searchInput: searchInput,
    }).then((res) => {
      return res.data;
    });
  } else {
    blokIcon.classList.remove("hide-blok");
    blokIcon.classList.add("show-blok");
    getTodayWorkouts(number);
    console.log(EMPTY);
  }
}

function queryFetch(query, variables) {
  return fetch(DEV_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}

//Kreiranje eventListenera
function createClickListeners() {
  leftArrow.addEventListener("click", async (e) => {
    e.preventDefault();
    number--;
    getTodayWorkouts(number);
  });

  rightArrow.addEventListener("click", async (e) => {
    e.preventDefault();
    number++;
    getTodayWorkouts(number);
  });

  searchEnter.addEventListener("submit", async (e) => {
    e.preventDefault();
    const getWorkoutBySearchInput = await getWorkoutBySearch(searchInput.value);
    if (getWorkoutBySearchInput != null) {
      renderSearchResultview(getWorkoutBySearchInput.getWorkoutBySearchInput);
    }
  });
}
//Kreiranje UI-a
function renderSearchResultview(searchResult) {
  //isprazni div
  document.getElementById("blok-proba").innerHTML = ``;
  if (searchResult != 0) {
    searchResult.forEach((day) => {
      //kreiraj onoliko node koliko ima dana
      const node = document.createElement("div");
      node.classList.add("blok");
      let dateCreated = removeTime(new Date(parseInt(day.date)));
      let date = createDateString(dateCreated);
      //Napisi koji je to dan i datum
      node.innerHTML = createRowWithAvailableDataView(
        day.day,
        date,
        day.workout
      );
      document.getElementById("blok-proba").appendChild(node);
      //posalji listu workouta gdje se onda koja ce bit array()
    });
  } else {
    //nema rezultata
    console.log(EMPTY);
    document.getElementById("blok-proba").innerHTML = noWorkoutView(NOT_FIND);
  }
}

function createRowWithAvailableDataView(day, date, workouts) {
  return `<div class="blok-naslov">
          <h3 class="blok-naslov">${day}</h3>
          <h4>${date}</h4>
          <hr class="line">
        </div>
        <div class="blok-table">
          <table>
            <tr class="blok-table__title">
              <th>Vježba:</th>
              <th>Serije:</th>
              <th>Ponavljanja:</th>
              <th>Opis:</th>
            </tr>
            <tr>
              ${generateListItems(workouts)}
            </tr>
          </table>    
        </div>
    `;
}

function createRowWithEmptyDataView(day) {
  return `
      <div class="blok-naslov">
        <h3 class="blok-naslov">${day}</h3>
        <p>${NO_WORKOUTS_AVAILABLE}</p>
      </div>
    `;
}

function noWorkoutView(msg) {
  return `
   <br>
   <br>
   <br>
   <h1>${msg}</h1>
  `;
}

function generateListItems(argument) {
  items = "";
  argument.forEach((workout) => {
    items += `
          <tr>
            <td>
              ${workout.title}
            </td>
            <td>
              ${workout.series}
            </td>
            <td>
              ${workout.reps}
            </td>
            <td>
              ${workout.description}
            </td>
          </tr>
          `;
  });
  return items;
}

function init() {
  getTodayWorkouts(0);
}

//First method to initiate when page open
init();
createClickListeners();
