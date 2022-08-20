const graf = document.getElementById('graf');
const grafInfo = document.getElementById('blok-graf__info');
const prevM = document.getElementById('left');
const nextM = document.getElementById('right');
const dateRange = document.getElementById('dateRange');

let monthCounter = 0;

const blokGraf = document.getElementById('generiranje-grafa');
let id = [];

async function getWeeklyActivitiesl(date = new Date()) {
  const a = await queryFetch(GET_MONTHLY_ACTIVITIES_QUERY, {
    date: date.toString(),
  });
  const result = a.data.getMonthlyActivities;
  console.log(result);
  if (result.length == 0) {
    return (blokGraf.innerHTML = noActivitiesView(EROR));
  }

  let weekNumber = 0;
  id = [];
  let d = new Date(date);
  const firstDayOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
  const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0);

  dateRange.innerHTML = `${createDateString(
    firstDayOfMonth
  )} - ${createDateString(lastDayOfMonth)}`;
  blokGraf.innerHTML = ``;
  result.forEach((element) => {
    const node = document.createElement('div');
    node.classList.add('blok');
    node.innerHTML = createRowWithAvailableStepsDataView(
      element.week,
      element.totalSteps,
      weekNumber
    );
    weekNumber++;
    blokGraf.appendChild(node);
    id.forEach((element) => {
      console.log(element);
      generateCharts(result[element.index].weeklyActivities, element.chartId);
    });
  });
}

function createClickListeners() {
  prevM.addEventListener('click', () => {
    monthCounter--;
    console.log(monthCounter);
    getWeeklyActivitiesl(subtractMonths(monthCounter));
  });
  nextM.addEventListener('click', () => {
    monthCounter++;
    getWeeklyActivitiesl(subtractMonths(monthCounter));
  });
}

//Generiranje UI-a
function createActivityRowView(activity) {
  return `
  <ul>
    <li><h2 class="blok-podaci__user-name">${activity.day}</h2></li>
    <li>${activity.totalSteps}</li>
  </ul> 
`;
}

function createRowWithAvailableStepsDataView(week, totalSteps, weekNumber) {
  if (totalSteps != 0) {
    id.push({ chartId: week, index: weekNumber });
    return `
        <div class="blok-naslov">
          <h2 class="blok-naslov">${week}</h2>
          <p id="steps">${totalSteps}</p>
          <hr class="line">
        </div>
        <div  class="graf">
           <canvas id="${week}" style="width: 100%; max-width: 600px"></canvas>
        </div>
 `;
  } else {
    return `
        <div class="blok-naslov">
          <br>
          <br>
          <h2 id="blok-naslov">${week}</h2>
          <br>
          <br>
          <p>Nema aktivnosti za ovaj tjedan!</p>
             <br>
          <br>
        </div>
 `;
  }
}

function noActivitiesView(msg) {
  return `
  <div class="blok-naslov">
   <br>
   <br>
   <br>
   <h2>${msg}</h1>
   </div>`;
}

getWeeklyActivitiesl(subtractMonths(0));
createClickListeners();
