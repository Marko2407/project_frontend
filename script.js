const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');
let items = '';

const form = document.getElementById('search');
const searchInput = form.elements['search'];

async function getTodayWorkouts(weeklyOffsetNumber) {
  document.getElementById('blok-proba').innerHTML = ``;
  const workouts = await queryFetch(
    `
    query GetWorkoutForSelectedWeek($weeklyOffset: Int) {
    getWorkoutForSelectedWeek(weeklyOffset: $weeklyOffset) {
    day
    workouts {
      id
      day
      title
      description
      dateCreated
      series
      reps
    }
  }
}
    `,
    { weeklyOffset: weeklyOffsetNumber }
  );

  let list = workouts.data.getWorkoutForSelectedWeek;
  if (list != 0) {
    console.log(list);
    list.forEach((day) => {
      const node = document.createElement('div');
      node.classList.add('blok');
      if (day.workouts.length != 0) {
        let dateCreated = day.workouts[0].dateCreated;
        node.innerHTML = `
    <div class="blok-naslov">
      <h3 class="blok-naslov">${day.day}</h3>
      <h4>${dateCreated}</h4>
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
          ${generateListItems(day)}
        </tr>
      </table>    
    </div>
 `;
      } else {
        node.innerHTML = `
   <div class="blok-naslov">
    <h3 class="blok-naslov">${day.day}</h3>
    <p>No workouts available</p>
  </div>
`;
      }
      document.getElementById('blok-proba').appendChild(node);
    });
  } else {
    console.log('Empty list');
    document.getElementById('blok-proba').innerHTML = `
   <br>
   <br>
   <br>
   <h1>No workouts available</h1>
    
  `;
  }
}

//First method to initiate when page open
getTodayWorkouts(0);

const leftArrow = document.getElementById('left');
let number = 0;

leftArrow.addEventListener('click', async (e) => {
  e.preventDefault();
  number++;
  getTodayWorkouts(number);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const getWorkoutBySearchInput = await getWorkoutBySearch(searchInput.value);
  if(getWorkoutBySearchInput != null){
    console.log(getWorkoutBySearchInput.getWorkoutBySearchInput)
    renderSearchResultview(getWorkoutBySearchInput.getWorkoutBySearchInput)
  }
});

function renderSearchResultview(searchResult){
  //isprazni div 
  document.getElementById('blok-proba').innerHTML = ``;
  if(searchResult !=0){
    searchResult.forEach((day) => {
      //kreiraj onoliko node koliko ima dana
      const node = document.createElement('div');
      node.classList.add('blok');
        //Napisi koji je to dan i datum
      node.innerHTML = `
      <div class="blok-naslov">
         <h3 class="blok-naslov">${day.day}</h3>
        <h4>${day.date}</h4>
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
            ${generateSearchListItems(day.workout)}
          </tr>
        </table>    
      </div>
    `;
    document.getElementById('blok-proba').appendChild(node);
    //posalji listu workouta gdje se onda koja ce bit array() 
  })
  }else{
    //nema rezultata
    console.log('Empty list');
    document.getElementById('blok-proba').innerHTML = `
   <br>
   <br>
   <br>
   <h1>No workouts available</h1>
    
  `;
  }
  

}

function generateSearchListItems(argument) {
  items = '';
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


function getWorkoutBySearch(searchInput) {
  if(searchInput != ""){
  return queryFetch(
    `
         query GetWorkoutBySearchInput($searchInput: String) {
             getWorkoutBySearchInput(searchInput: $searchInput) {
    day
    date
    workout {
      id
      day
      title
      description
      dateCreated
      series
      reps
    }
  }
           }
         `,
    { searchInput: searchInput }
  ).then((res) => {
    return res.data;
  });
}else{
  getTodayWorkouts(number)
  console.log("PRAZNO")
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

// BLOKOVI S VJEŽBAMA
const blokVjezbi = document.getElementById('row');

function generateListItems(argument) {
  items = '';
  argument.workouts.forEach((workout) => {
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
