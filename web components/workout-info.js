//Dnevni graf

const templateWorkoutInfo = document.createElement('template');
templateWorkoutInfo.innerHTML += `
  <div class = "blok-vjezbe">
    <link rel="stylesheet" href="../styles/stylesheet.css" />
  <div class="blok-vjezbe__dani">
            <p id="trenutni-dan"></p>
            <div id="container-vjezbe"></div>
          </div>
          <div class="blok-vjezbe__gumbi">
            <a href="vježbe.html"> <button class="btn">Sve vježbe</button></a>
            <br />
            <button class="btn" id="open">Dodaj</button>
          </div>
        </div>
        `;

class WorkoutInfo extends HTMLElement {
  get workoutInfo() {
    return this._workoutInfo;
  }

  set workoutInfo(value) {
    this._workoutInfo = value;
  }

  constructor() {
    super();
    this._graphInfo = '';
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.attachShadow.innerHTML = '';
    console.log(this.workoutInfo);
    const { shadowRoot } = this;
    const instance = document.importNode(templateWorkoutInfo.content, true);

    instance.querySelector('#trenutni-dan').innerHTML = `<card-title title="${
      daysInWeek[new Date().getUTCDay()]
    }"></card-title>`;

    if (this.workoutInfo.length !== 0) {
      console.log(this.workoutInfo);
      instance.querySelector('#container-vjezbe').innerHTML =
        createWorkoutRowView(this.workoutInfo);
    } else {
      instance.querySelector('#container-vjezbe').innerHTML =
        createRowWithEmptyDataView();
      // UBACITI NEKI POPUP ILI SLICNO TIPA ALERT
      console.log(EMPTY_DATA);
    }

    setClickListenersWorkout(instance);
    shadowRoot.appendChild(instance);
  }
}

function setClickListenersWorkout(instance) {
  const workoutModalContainer = document.getElementById('modal_container');
  instance.querySelector('#open').addEventListener('click', () => {
    workoutModalContainer.classList.add('show');
  });
}

function createWorkoutRowView(workouts) {
  return `
    <ul>
      ${generateListItems(workouts)}
    </ul>
  `;
}

function createRowWithEmptyDataView() {
  return `
       <div class="blok-naslov">
         <p>${NO_WORKOUTS_AVAILABLE}</p>
       </div>
     `;
}

// PRIKAZ VJEZBI U TRENUTNOM DANU
function generateListItems(argument) {
  let items = '';
  argument.forEach((element) => {
    items += `<li>${element.title}</li>`;
  });
  return items;
}

customElements.define('workout-info', WorkoutInfo);
