//Tjedni graf
const templateGraphMonthly = document.createElement('template');
templateGraphMonthly.innerHTML += `
    <link rel="stylesheet" href="../styles/stylesheet.css" />
   <div class = "blok" id="blok_graphs">
   <div id="graphs"></div>
      <div class="graf" id="graf">
            <!-- CANVAS -->
            <canvas id="myChart" style="width: 100%; max-width: 600px"></canvas>
          </div>
   </div>
        `;

class GraphInfoWMonthly extends HTMLElement {
  get element() {
    return this._element;
  }

  set element(values) {
    this._element = values;
  }

  constructor() {
    super();
    this._element = '';
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    console.log(this.element.element.weeklyActivities);
    const { shadowRoot } = this;
    const instance = document.importNode(templateGraphMonthly.content, true);
    if (this.element.element.totalSteps != 0) {
      renderAvailableData(instance, this.element.element);
    } else {
      instance.querySelector('#blok_graphs').innerHTML =
        createRowWithNullStepsData(this.element.element.week);
    }

    shadowRoot.appendChild(instance);
  }
}

function renderAvailableData(instance, element) {
  instance.querySelector('#graphs').innerHTML =
    createRowWithAvailableStepsDataView(element.week, element.totalSteps);
  const ctxa = instance.querySelector('#myChart');
  let values = [];
  element.weeklyActivities.forEach((element) => {
    values.push(element.totalSteps);
  });
  createChart(ctxa, values);
}

function createRowWithAvailableStepsDataView(week, totalSteps) {
  return `
        <div class="blok-naslov">
          <h2 class="blok-naslov">${week}</h2>
          <p id="steps">${totalSteps}</p>
          <hr class="line">
        </div> 
 `;
}

function createRowWithNullStepsData(week) {
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

customElements.define('graph-info-monthly', GraphInfoWMonthly);
