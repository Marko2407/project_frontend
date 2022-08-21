//Tjedni graf
const templateGraphWeekly = document.createElement("template");
templateGraphWeekly.innerHTML += `
    <link rel="stylesheet" href="stylesheet.css" />
   <br />
          <div class="graf" id="graf">
            <!-- CANVAS -->
            <canvas id="myChart" style="width: 100%; max-width: 600px"></canvas>
          </div>
        `;

class GraphInfoWeekly extends HTMLElement {
  get yValues() {
    return this._yValues;
  }

  set yValues(values) {
    this._yValues = values;
  }

  constructor() {
    super();
    this._yValues = "";
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    console.log(this.yValues);
    const { shadowRoot } = this;
    const instance = document.importNode(templateGraphWeekly.content, true);
    const ctx = instance.querySelector(this.yValues.chartId);
    setClickListeners(instance);
    shadowRoot.appendChild(instance);
    createChart(ctx, this.yValues.values);
  }
}

function setClickListeners(instance) {}

customElements.define("graph-info-weekly", GraphInfoWeekly);
