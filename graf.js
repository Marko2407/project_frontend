const graf = document.getElementById('graf');
const grafInfo = document.getElementById('blok-graf__info');
const prevM = document.getElementById('left-activities');
const nextM = document.getElementById('right-activities');
let monthCounter = 0;

const blokGraf = document.getElementById('blok-graf');
let id = [];

async function getWeeklyActivitiesl(date = new Date()) {
  const a = await queryFetch(GET_MONTHLY_ACTIVITIES_QUERY, {
    date: date.toString(),
  });
  const result = a.data.getMonthlyActivities;
  console.log(result);
  let weekNumber = 0;
  id = [];
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
    <li><h3 class="blok-podaci__user-name">${activity.day}</h3></li>
    <li>${activity.totalSteps}</li>
  </ul> 
`;
}

function createRowWithAvailableStepsDataView(week, totalSteps, weekNumber) {
  if (totalSteps != 0) {
    id.push({ chartId: week, index: weekNumber });
    return `
        <div class="blok-naslov">
          <h3 class="blok-naslov">${week}</h3>
          <h4>${totalSteps}</h4>
          <hr class="line">
        </div>
        <div>
           <canvas id="${week}" style="width: 100%; max-width: 600px"></canvas>
        </div>
 `;
  } else {
    return `
        <div class="blok-naslov">
          <h3 class="blok-naslov">${week}</h3>
          <hr class="line">
          <br>
          <br>
          <br>
            <h4>No Activities for today</h4>
             <br>
          <br>
        </div>
 `;
  }
}

getWeeklyActivitiesl(subtractMonths(0));
createClickListeners();
