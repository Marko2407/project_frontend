//Dnevni graf

const templateGraph = document.createElement('template');
templateGraph.innerHTML += `
  <div class = "blok-grafovi">
    <link rel="stylesheet" href="../styles/stylesheet.css" />
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
    this._graphInfo = '';
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.attachShadow.innerHTML = '';
    console.log(this.graphInfo);
    const { shadowRoot } = this;
    const instance = document.importNode(templateGraph.content, true);
    instance.querySelector('#blok-graf_info').innerHTML = createActivityRowView(
      this.graphInfo
    );

    setClickListenersGraphs(instance);
    shadowRoot.appendChild(instance);
  }
}

function createActivityRowView(activity) {
  return `
  <ul>
    <li>
    <card-title title = "${getDayOnCroatian(activity.day)}" ></card-title>
   </li>
    <li>${activity.totalSteps}</li>
  </ul> 
`;
}

function setClickListenersGraphs(instance) {
  const unesiKorake = instance.querySelector('#unesi_korake');
  const inputKoraci = instance.querySelector("input[name = 'koraci']");

  unesiKorake.addEventListener('click', async (e) => {
    e.preventDefault();
    JsLoadingOverlay.show();
    const koraci = parseInt(inputKoraci.value);
    console.log(koraci == NaN);
    if (!isNaN(koraci)) {
      await updateSteps(koraci);
    } else {
      console.log('Unesi korake');
    }
  });
}

customElements.define('graph-info', GraphInfo);
