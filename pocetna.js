const workoutList = document.getElementById('workout-list');
const workoutTitle = document.getElementById('workoutNames');
let list = [];
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
  list = workouts.data.getTodayWorkouts;
  let workoutListCurrentDay = [];
  if (list.length !== 0) {
    console.log(list);
    let workoutNames = list.map(function (workoutName) {
      return ` ${workoutName.title}`;
    });
    workoutListCurrentDay.push(list[0].day, workoutNames);

    console.log(workoutListCurrentDay);

    workouts.data.getTodayWorkouts.forEach((data) => {
      // console.log(data);

      // IME TRENUTNOG DANA
      document.getElementById('trenutni-dan').innerHTML = `
      ${list[0].day}
  `;

      // VJEŽBE U TRENUTNOM DANU
      document.getElementById('container-vjezbe').innerHTML = `
    <ol>
      ${generateListItems(list)}
    </ol>
  `;
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

// MODAL

const openModal = document.getElementById('open');
const modalContainer = document.getElementById('modal_container');
const closeModal = document.getElementById('close');

openModal.addEventListener('click', () => {
  modalContainer.classList.add('show');
});

closeModal.addEventListener('click', () => {
  modalContainer.classList.remove('show');
});

// PRIKAZ VJEZBI U TRENUTNOM DANU

function generateListItems(argument) {
  let items = '';
  for (let i = 0; i < argument.length; i++) {
    items += `<li>${argument[i].title}</li>`;
  }
  return items;
}
