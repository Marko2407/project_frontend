const workoutList = document.getElementById('workout-list');
let list = [];
const form = document.getElementById('search');
const searchInput = form.elements['search'];

async function getAll() {
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
  console.log(workouts.data.getTodayWorkouts);
  if (workouts.data.getTodayWorkouts != null) {
    workouts.data.getTodayWorkouts.forEach((data) => {
      console.log(data);
      let element = document.createElement('div');
      element.innerText = data.title;
      workoutList.append(element);
    });
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
         query GetWorkoutBySearchInput($title: String) {
             getWorkoutBySearchInput(title: $title) {
               id
               title
               description
               dateCreated
               day
             }
           }
         `,
    { title: searchInput }
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
