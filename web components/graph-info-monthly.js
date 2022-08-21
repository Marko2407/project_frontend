//Tjedni graf
const templateGraphMonthly = document.createElement("template");
templateGraphMonthly.innerHTML += `
    <link rel="stylesheet" href="stylesheet.css" />
   <div class = "blok" id="blok_graphs"> </div>
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
    this._element = "";
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    console.log(this.element.element.week);
    const { shadowRoot } = this;
    const instance = document.importNode(templateGraphMonthly.content, true);
    instance.querySelector("#blok_graphs").innerHTML =
      createRowWithAvailableStepsDataView(
        this.element.element.week,
        this.element.element.totalSteps
      );
    shadowRoot.appendChild(instance);
  }
}

function createRowWithAvailableStepsDataView(week, totalSteps) {
  if (totalSteps != 0) {
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

customElements.define("graph-info-monthly", GraphInfoWMonthly);
