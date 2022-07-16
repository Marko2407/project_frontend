const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');
let items = '';

const form = document.getElementById('search');
const searchInput = form.elements['search'];

async function getTodayWorkouts() {
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
    { weeklyOffset: 0 }
  );

  let list = workouts.data.getWorkoutForSelectedWeek;
  if (list != 0) {
    console.log(list);
    list.forEach((day) => {
      const node = document.createElement('div');
      node.classList.add('blok');
      if (day.workouts.length != 0) {
        node.innerHTML = `
    <div class="blok-naslov">
      <h3 class="blok-naslov">${day.day}</h3>
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
      document.getElementById('row').appendChild(node);
    });
  } else {
    console.log('Empty list');
    document.getElementById('row').innerHTML = `
   
    <h1>No workouts available</h1>
    
  `;
  }
}

//First method to initiate when page open
getTodayWorkouts();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const getWorkoutBySearchInput = await getWorkoutBySearch(searchInput.value);
  if (getWorkoutBySearchInput.getWorkoutBySearchInput != null) {
    workoutList.innerHTML = '';
    getWorkoutBySearchInput.getWorkoutBySearchInput.forEach((e) => {
      console.log(e);
      let element = document.createElement('div');
      element.innerText = e.title;
      workoutList.append(element);
    });
  }
});

function getWorkoutBySearch(searchInput) {
  return queryFetch(
    `
         query GetWorkoutBySearchInput($searchInput: String) {
             getWorkoutBySearchInput(searchInput: $searchInput) {
               id
               title
               description
               dateCreated
               day
             }
           }
         `,
    { searchInput: searchInput }
  ).then((res) => {
    return res.data;
  });
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
