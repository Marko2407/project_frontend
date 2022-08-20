class CardTitle extends HTMLElement {
  get title() {
    return this.title || 'TITLEE';
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
    <style>
    h3 {
       padding-bottom: 2rem;
  font-size: 1.8rem;
    }
    </style>
    <h3>${this.getAttribute('title')}</h3>
    `;
  }
}

customElements.define('card-title', CardTitle);
