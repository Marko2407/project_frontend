class BigTitle extends HTMLElement {
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
      .blok-title {
      display: inline-block;
      font-size: 2.3rem;
      padding: 2.1rem 0 2.1rem 0;
      width: 30rem;
      }
    </style>
    <h1 class="blok-title">${this.getAttribute("title")}</h1>
 `;
  }
}

customElements.define("big-title", BigTitle);
