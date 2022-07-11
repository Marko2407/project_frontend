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
    <ul>
      ${generateListItems(list)}
    </ul>
  `;
    });
  } else {
    // UBACITI NEKI POPUP ILI SLICNO TIPA ALERT
    console.log('Empty list');
  }
}

async function createNewWorkout(workout) {
  console.log(workout);
  await queryFetch(
    `
    mutation CreateWorkout($title: String, $description: String, $dateCreated: String, $reps: Int, $series: Int) {
      createWorkout(title: $title,description: $description,dateCreated: $dateCreated,reps: $reps,series: $series) {
        id
        title
        description
        dateCreated
        day
        series
        reps
      }
    }
         `,
    {
      title: workout[0],
      description: workout[3],
      reps: workout[1],
      series: workout[2],
    }
  );
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
const addModal = document.getElementById('add');

const vj1 = document.querySelector("input[name = 'vj1']");
const vj2 = document.querySelector("input[name = 'vj2']");
const vj3 = document.querySelector("input[name = 'vj3']");

const s1 = document.querySelector("input[name = 's1']");
const s2 = document.querySelector("input[name = 's2']");
const s3 = document.querySelector("input[name = 's3']");

const r1 = document.querySelector("input[name = 'r1']");
const r2 = document.querySelector("input[name = 'r2']");
const r3 = document.querySelector("input[name = 'r3']");

const opisVj1 = document.querySelector("textarea[name = 'opisVj1']");
const opisVj2 = document.querySelector("textarea[name = 'opisVj2']");
const opisVj3 = document.querySelector("textarea[name = 'opisVj3']");

openModal.addEventListener('click', () => {
  modalContainer.classList.add('show');
});

closeModal.addEventListener('click', () => {
  modalContainer.classList.remove('show');
});

addModal.addEventListener('click', async (e) => {
  e.preventDefault();
  const firstWorkout = [
    vj1.value,
    parseInt(s1.value),
    parseInt(r1.value),
    opisVj1.value,
  ];
  const secondWorkout = [
    vj2.value,
    parseInt(s2.value),
    parseInt(r2.value),
    opisVj2.value,
  ];
  const thirdWorkout = [
    vj3.value,
    parseInt(s3.value),
    parseInt(r3.value),
    opisVj3.value,
  ];

  const listOfCreatedWorkout = [firstWorkout, secondWorkout, thirdWorkout];

  for (let i = 0; i < listOfCreatedWorkout.length; i++) {
    if (listOfCreatedWorkout[i][0] !== '') {
      createNewWorkout(listOfCreatedWorkout[i]);
    } else {
      console.log('Please enter Title');
    }
  }
  location.reload();
});
// PRIKAZ VJEZBI U TRENUTNOM DANU

function generateListItems(argument) {
  let items = '';
  for (let i = 0; i < argument.length; i++) {
    items += `<li>${argument[i].title}</li>`;
  }
  return items;
}
