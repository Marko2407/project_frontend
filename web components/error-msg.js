class ErrorMsg extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const { shadowRoot } = this;
    this.shadowRoot.innerHTML = `
     <link rel="stylesheet" href="../styles/stylesheet.css" />
      <div class="blok-naslov">
   <br>
   <br>
   <h2>${this.getAttribute('title')}</h2>
   </div>
 `;
  }
}

customElements.define('error-msg', ErrorMsg);
