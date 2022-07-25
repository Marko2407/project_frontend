const graf = document.getElementById('graf');
const grafInfo = document.getElementById('blok-graf__info');
//const unesiKorake = document.getElementById('unesi_korake');
//const inputKoraci = document.querySelector("input[name = 'koraci']");
const blokGraf = document.getElementById('blok-graf');
const id = [];

// DANI
let xValues = ['pon', 'pon', 'pon', 'pon', 'pon', 'pon', 'pon'];
// KORACI
let yValues = [];
// BOJE
let barColors = ['red', 'green', 'blue', 'orange', 'brown', 'yellow', 'pink'];

async function getWeeklyActivities() {
  const a = await queryFetch(GET_WEEKLY_ACTIVITIES_QUERY);
  console.log(a.data.getWeeklyActivities);
  const result = a.data.getWeeklyActivities;
  result.activities.forEach((element) => {
    xValues.push(element.day);
    yValues.push(element.totalSteps);
  });
  createChart('myChart', xValues, yValues);
  console.log(a);
}

async function getTodayActivity() {
  const a = await queryFetch(GET_TODAY_ACIVITY_QUERY);
  console.log(a.data.getTodayActivity);
  const result = a.data.getTodayActivity;

  grafInfo.innerHTML = createActivityRowView(result);
}

async function getWeeklyActivitiesl() {
  const a = await queryFetch(GET_WEEKLY_ACTIVITIES_QUERY);
  const result = a.data.getWeeklyActivities;
  let mock = [result, result, result, result];
  let weekNumber = 0;
  console.log(mock);
  blokGraf.innerHTML = ``;
  mock.forEach((element) => {
    weekNumber++;
    const node = document.createElement('div');
    node.classList.add('blok');
    node.innerHTML = createRowWithAvailableStepsDataView(
      weekNumber,
      element.totalSteps,
      element.activities
    );
    blokGraf.appendChild(node);
    id.forEach((element, index) => {
      generateChart(mock[index].activities, element);
    });
  });
}

function createChart(id, valuesY) {
  new Chart(id, {
    type: 'bar',
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: valuesY,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Tjedna aktivnost',
      },
    },
  });
}

async function updateTodaySteps(step) {
  await queryFetch(UPDATE_TODAY_STEPS_MUTATION, {
    steps: step,
  });
  xValues = [];
  yValues = [];
  await getTodayActivity();
  await getWeeklyActivities();
}

// KREIRANJE CLICK LISTENERS-a
// unesiKorake.addEventListener('click', async (e) => {
//   e.preventDefault();
//   const koraci = parseInt(inputKoraci.value);
//   if (koraci != '') {
//     await updateTodaySteps(koraci);
//   } else {
//     console.log('Unesi korake');
//   }
// });

function queryFetch(query, variables) {
  return fetch(DEV_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
}

//Generiranje UI-a
function createActivityRowView(activity) {
  return `
  <ul>
    <li><h3 class="blok-podaci__user-name">${activity.day}</h3></li>
    <li>${activity.totalSteps}</li>
  </ul> 
`;
}

function createRowWithAvailableStepsDataView(weekNumber, totalSteps) {
  const id_graf = 'week' + weekNumber;
  id.push(id_graf);

  return `
        <div class="blok-naslov">
          <h3 class="blok-naslov">Tjedan ${weekNumber}</h3>
          <h4>${totalSteps}</h4>
          <hr class="line">
        </div>
        <div>
           <canvas id="${id_graf}" style="width: 100%; max-width: 600px"></canvas>
        </div>
 `;
}

function generateChart(activities, id) {
  let y = [];
  activities.forEach((element) => {
    y.push(element.totalSteps);
  });
  createChart(id, y);
}

// KONSTANTE
const DEV_URL = 'http://localhost:4000/graphql/';
const GET_WEEKLY_ACTIVITIES_QUERY = `
query GetWeeklyActivities {
  getWeeklyActivities {
    activities {
      id
      day
      dateCreated
      steps
      totalSteps
    }
    totalSteps
  }
}
`;

const GET_TODAY_ACIVITY_QUERY = `
 query GetTodayActivity {
   getTodayActivity {
     id
     day
     dateCreated
     steps
     totalSteps
   }
 }
`;

const UPDATE_TODAY_STEPS_MUTATION = `
 mutation Mutation($steps: Int) {
   updateTodayActivity(steps: $steps) {
     id
     day
     dateCreated
     steps
     totalSteps
   }
 }
`;

getWeeklyActivitiesl();
getTodayActivity();
