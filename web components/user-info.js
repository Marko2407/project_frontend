const templateUser = document.createElement('template');
templateUser.innerHTML += `
  <div class = "blok-podaci">
        <link rel="stylesheet" href="../styles/stylesheet.css" />
      
        <div class="blok-podaci__info" id="blok_korisnik_info"></div>
        <div class="blok-podaci__gumbi">
          <button class="btn" id="user_edit">Promijeni</button>
          <br />
          <button class="btn" id="user_delete">Izbriši</button>
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
    instance.querySelector('#blok_korisnik_info').innerHTML = createUserRowView(
      this.userI
    );

    setClickListenersUser(instance);
    shadowRoot.appendChild(instance);
  }
}

//Generiranje UI-a
function createUserRowView(user) {
  return `
  <ul>
    <li><card-title title= "${user.prezimeKorisnika} ${user.imeKorisnika}"></card-title></li>
    <li>${user.visinaKorisnika} cm</li>
    <li>${user.tezinaKorisnika} kg</li>
  </ul> 
`;
}

function setClickListenersUser(instance) {
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
