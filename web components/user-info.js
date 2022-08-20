const templateUser = document.createElement('template');
templateUser.innerHTML += `
        <link rel="stylesheet" href="stylesheet.css" />
        <style>
        .user-info {
          width: 100%;
        }
        </style>
        <div class="user-info">
        <div class="blok-podaci__info" id="blok_korisnik_info"></div>
        <div class="blok-podaci__gumbi">
          <button class="btn" id="user_edit">Promijeni</button>
          <br />
          <button class="btn" id="user_delete">Izbriši</button>
        </div>
        </div>
        `;

class UserInfo extends HTMLElement {
  get userI() {
    return this._userI;
  }

  set userI(user) {
    this._userI = user;
  }

  constructor() {
    super();
    this._userI = '';
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.render();
  }
  render() {
    console.log(this.userI);
    const { shadowRoot } = this;
    const instance = document.importNode(templateUser.content, true);
    instance.querySelector('#blok_korisnik_info').innerHTML = `
  <ul>
    <li><card-title title= "${this.userI.prezimeKorisnika} ${this.userI.imeKorisnika}"></card-title></li>
    <li>${this.userI.visinaKorisnika} cm</li>
    <li>${this.userI.tezinaKorisnika}  kg</li>
  </ul> 
`;

    setClickListeners(instance);
    shadowRoot.appendChild(instance);
  }
}

function setClickListeners(instance) {
  const userModalContainer = document.getElementById('user_modal_container');
  instance.querySelector('#user_edit').addEventListener('click', () => {
    fillUserInfo();
    userModalContainer.classList.add('show');
  });

  instance
    .querySelector('#user_delete')
    .addEventListener('click', async (e) => {
      await deleteUser();
      location.reload();
    });
}

customElements.define('user-info', UserInfo);
