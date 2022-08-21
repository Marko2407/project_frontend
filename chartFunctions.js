// DANI
let xValues = ["PON", "UTO", "SRI", "ČET", "PET", "SUB", "NED"];
// BOJE
let barColors = ["red", "green", "blue", "orange", "brown", "yellow", "pink"];

function createChart(id, valuesY) {
  console.log(id);
  new Chart(id, {
    type: "bar",
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
        text: "Tjedna aktivnost",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function generateCharts(activities, id) {
  console.log(activities);
  console.log(id);
  let y = [];
  activities.forEach((element) => {
    y.push(element.totalSteps);
  });
  createChart(id, y);
}
