//Dnevni graf

const templateGraph = document.createElement("template");
templateGraph.innerHTML += `
  <div class = "blok-grafovi">
    <link rel="stylesheet" href="stylesheet.css" />
  <div class="blok-grafovi__1">
            <div class="blok-podaci__info" id="blok-graf_info"></div>
            <div class="blok-grafovi__gumbi">
              <input type="number" name="koraci" />
              <button class="btn" id="unesi_korake">Unesi</button>
            </div>
          </div>
        </div>
        `;

class GraphInfo extends HTMLElement {
  get graphInfo() {
    return this._graphInfo;
  }

  set graphInfo(user) {
    this._graphInfo = user;
  }

  constructor() {
    super();
    this._graphInfo = "";
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    console.log(this.graphInfo);
    const { shadowRoot } = this;
    const instance = document.importNode(templateGraph.content, true);
    instance.querySelector("#blok-graf_info").innerHTML = ` 
    <ul>
    <li>
    <card-title title = "${getDayOnCroatian(this.graphInfo.day)}" ></card-title>
   </li>
    <li>${this.graphInfo.totalSteps}</li>
  </ul> `;

    setClickListeners(instance);
    shadowRoot.appendChild(instance);
  }
}

function setClickListeners(instance) {}

customElements.define("graph-info", GraphInfo);

//Tjedni graf
const templateGraphWeekly = document.createElement("template");
templateGraphWeekly.innerHTML += `
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
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
    const ctx = instance.querySelector("#myChart");
    setClickListeners(instance);
    shadowRoot.appendChild(instance);
    createChart(ctx, this.yValues);
  }
}

function setClickListeners(instance) {}

customElements.define("graph-info-weekly", GraphInfoWeekly);
