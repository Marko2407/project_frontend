const templateWorkoutWeeklyInfo = document.createElement('template');
templateWorkoutWeeklyInfo.innerHTML += `
  <link rel="stylesheet" href="../styles/stylesheet.css" />
    <div class = "blok" id= "blok_workout"></div>`;

class WorkoutWeeklyInfo extends HTMLElement {
  get workoutWeeklyInfo() {
    return this._workoutWeeklyInfo;
  }

  set workoutWeeklyInfo(value) {
    this._workoutWeeklyInfo = value;
  }

  constructor() {
    super();
    this._workoutWeeklyInfo = '';
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.attachShadow.innerHTML = '';
    console.log(this.workoutWeeklyInfo);
    const { shadowRoot } = this;
    const instance = document.importNode(
      templateWorkoutWeeklyInfo.content,
      true
    );

    let day = this.workoutWeeklyInfo;

    if (day.workouts.length != 0) {
      let dateCreated = null;
      if (day.date == null) {
        dateCreated = removeTime(
          new Date(parseInt(day.workouts[0].dateCreated))
        );
      } else {
        dateCreated = removeTime(new Date(parseInt(day.date)));
      }

      let date = createDateString(dateCreated);
      instance.querySelector('#blok_workout').innerHTML =
        createRowWithAvailableDataView(
          getDayOnCroatian(day.day),
          date,
          day.workouts
        );
    } else {
      instance.querySelector('#blok_workout').innerHTML =
        createRowWithEmptyDataView(getDayOnCroatian(day.day));
    }

    shadowRoot.appendChild(instance);
  }
}

function createRowWithAvailableDataView(day, date, workouts) {
  return `
     <link rel="stylesheet" href="../styles/stylesheet.css" />
  <div class="blok-naslov">
          <h2 class="blok-naslov">${day}</h2>
          <p>${date}</p>
          <hr class="line">
        </div>
        <div class="blok-table">
          <table>
            <tr class="blok-table__title">
              <th>Vježba:</th>
              <th>Serije:</th>
              <th>Ponavljanja:</th>
              <th>Opis:</th>
            </tr>
            <tr>
              ${generateListItems(workouts)}
            </tr>
          </table>    
        </div>
    `;
}

function createRowWithEmptyDataView(day) {
  return `
      <div class="blok-naslov">
        <h2 class="blok-naslov">${day}</h2>
        <br>
        <p>${NO_WORKOUTS_AVAILABLE}</p>
      </div>
    `;
}

function noWorkoutView(msg) {
  return `
   <br>
   <br>
   <br>
   <h1>${msg}</h1>
  `;
}

function generateListItems(argument) {
  items = '';
  argument.forEach((workout) => {
    items += `
          <tr>
            <td>
              ${workout.title}
            </td>
            <td>
              ${workout.series}
            </td>
            <td>
              ${workout.reps}
            </td>
            <td>
              ${workout.description}
            </td>
          </tr>
          `;
  });
  return items;
}

customElements.define('workout-weekly-info', WorkoutWeeklyInfo);
