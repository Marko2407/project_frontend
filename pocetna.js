const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');

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
  let list = workouts.data.getTodayWorkouts;
  let workoutListCurrentDay = [];
  if (list != null) {
    let workoutNames = list.map(function (workoutName) {
      return ` ${workoutName.title}`;
    });
    workoutListCurrentDay.push(list[0].day, workoutNames);

    console.log(workoutListCurrentDay);

    console.log(workouts.data.getTodayWorkouts);

    workouts.data.getTodayWorkouts.forEach((data) => {
      // console.log(data);
    });
  } else {
    console.log('Empty list');
  }
}

//First method to initiate when page open
getAll();

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
