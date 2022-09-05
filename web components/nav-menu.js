const templateNav = document.createElement('template');
templateNav.innerHTML += `
                <!-- CSS -->
        <link rel="stylesheet" href="../styles/stylesheet.css" />

        <!--FA ICON -->
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <div class="nav-column"></div>
        `;

class NavMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const { shadowRoot } = this;
    const templateNode = document.getElementById('nav-template');

    shadowRoot.innerHTML = '';
    if (templateNav) {
      const instance = document.importNode(templateNav.content, true);
      instance.querySelector('.nav-column').innerHTML = `
    <div>
        <a href="index.html"><i class="fa fa-home" aria-hidden="true"></i></a>
      </div>
      <div>
        <a href="vježbe.html"><i class="fa fa-child" aria-hidden="true"></i></a>
      </div>
      <div>
        <a href="graf.html"
          ><i class="fa fa-bar-chart" aria-hidden="true"></i
        ></a>
      </div>
    `;
      console.log('super ovo radi');
      shadowRoot.appendChild(instance);
    } else {
      console.log('Došlo je do greške');
    }
  }
}

customElements.define('nav-menu', NavMenu);
