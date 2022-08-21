const graf = document.getElementById("graf");
const grafInfo = document.getElementById("blok-graf__info");
const prevM = document.getElementById("left");
const nextM = document.getElementById("right");
const dateRange = document.getElementById("dateRange");

let monthCounter = 0;

const blokGraf = document.getElementById("generiranje-grafa");
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
    const graphsContainer = document.createElement("graph-info-monthly");
    graphsContainer.element = { element: element, weekNumber };
    weekNumber++;
    blokGraf.appendChild(graphsContainer);
  });
}

function createClickListeners() {
  prevM.addEventListener("click", () => {
    monthCounter--;
    console.log(monthCounter);
    getWeeklyActivitiesl(subtractMonths(monthCounter));
  });
  nextM.addEventListener("click", () => {
    monthCounter++;
    getWeeklyActivitiesl(subtractMonths(monthCounter));
  });
}

function noActivitiesView(msg) {
  return `
  <error-msg title ="${msg}"></error-msg>`;
}

getWeeklyActivitiesl(subtractMonths(0));
createClickListeners();
