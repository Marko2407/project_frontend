class UserInfo extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
          <div class="blok blok-podaci" id="blok-podaci">
          <div class="blok-podaci__info" id="blok_korisnik_info"></div>
          <div class="blok-podaci__gumbi">
            <button class="btn" id="user_edit">Promijeni</button>
            <br />
            <button class="btn" id="user_delete">Izbriši</button>
          </div>
        </div>
  `;
  }
}

window.customElements.define('user-info', UserInfo);
