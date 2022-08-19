class BigTitle extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <style>
      .blok-title {
      display: inline-block;
      font-size: 2.3rem;
      padding: 2.1rem 0 2.1rem 0;
      width: 30rem;
      }
    </style>
    <h1 class="blok-title"></h1>
 `;
  }
}

window.customElements.define('big-title', BigTitle);
