const graf = document.getElementById("graf");
const grafInfo = document.getElementById("blok-graf__info");

const blokGraf = document.getElementById("blok-graf");
const id = [];

async function getWeeklyActivitiesl() {
  const a = await queryFetch(GET_MONTHLY_ACTIVITIES_QUERY, {
    date: new Date(),
  });
  const result = a.data.getMonthlyActivities;
  console.log(result);
  let weekNumber = 0;
  blokGraf.innerHTML = ``;
  result.forEach((element) => {
    const node = document.createElement("div");
    node.classList.add("blok");
    node.innerHTML = createRowWithAvailableStepsDataView(
      element.week,
      element.totalSteps,
      weekNumber
    );
    weekNumber++;
    blokGraf.appendChild(node);
    id.forEach((element) => {
      console.log(element);
      generateChart(result[element.index].weeklyActivities, element.chartId);
    });
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

getWeeklyActivitiesl();
