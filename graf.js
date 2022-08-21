const graf = document.getElementById("graf");
const grafInfo = document.getElementById("blok-graf__info");
const prevM = document.getElementById("left");
const nextM = document.getElementById("right");
const dateRange = document.getElementById("dateRange");

let monthCounter = 0;

JsLoadingOverlay.setOptions({
  overlayBackgroundColor: "#666666",
  overlayOpacity: 0.6,
  spinnerIcon: "ball-spin-clockwise",
  spinnerColor: "#000",
  spinnerSize: "2x",
  overlayIDName: "overlay",
  spinnerIDName: "spinner",
  offsetY: 0,
  offsetX: 0,
  lockScroll: false,
  containerID: null,
});

const blokGraf = document.getElementById("generiranje-grafa");
let id = [];

async function getWeeklyActivitiesl(date = new Date()) {
  JsLoadingOverlay.show();
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
  JsLoadingOverlay.hide();
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
