const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');

const form = document.getElementById('search');
const searchInput = form.elements['search'];

async function getAll() {
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
  if (list != null) {
    list.forEach((day) => {
      console.log(day.length);
      document.getElementById('row').innerHTML = `
     <div class="blok">
           
      ${generateListItems(day)}

                 
     </div>
  `;
    });

    // -----------------------------------------

    // -----------------------------------------
  } else {
    console.log('Empty list');
  }
}

//First method to initiate when page open
getAll();

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
let items = '';

function generateListItems(argument) {
  argument.workouts.forEach((vjezba) => {
    items += `

    <table>
     <tr>
              <th>Vježba:</th>
              <th>Serije:</th>
              <th>Ponavljanja:</th>
              <th>Opis:</th>
            </tr>
              <tr>
              <td>
                ${vjezba.title}
              </td>
              <td>
                ${vjezba.series}
              </td>
              <td>
                ${vjezba.reps}
              </td>
              <td>
                ${vjezba.description}
              </td>
            </tr>
                   </table>
  
      `;
  });
  return items;
}
