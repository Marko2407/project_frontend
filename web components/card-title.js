class CardTitle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const { shadowRoot } = this;
    this.shadowRoot.innerHTML = `
    <style>
    h3 {
   padding-bottom: 1.2rem;
  font-size: 1.8rem;
    }
    </style>
    <h3>${this.getAttribute("title")}</h3>
    `;
  }
}

customElements.define("card-title", CardTitle);
