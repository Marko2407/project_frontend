async function getCurrentUser() {
  const userQuery = await queryFetch(GET_CURRENT_USER_QUERY);
  console.log(userQuery);
  if (userQuery.data.getUser != null) {
    user.idKorisnika = userQuery.data.getUser.id;
    user.imeKorisnika = userQuery.data.getUser.firstName;
    user.prezimeKorisnika = userQuery.data.getUser.lastName;
    user.visinaKorisnika = parseInt(userQuery.data.getUser.height);
    user.tezinaKorisnika = parseInt(userQuery.data.getUser.weight);

    console.log(CREATED_USER + JSON.stringify(user));
    userBlok.innerHTML = createUserRowView(user);
    return true;
  } else {
    console.log(NO_CREATED_USER);
    return false;
  }
}

async function createNewUser(user) {
  console.log(user);
  await queryFetch(CREATE_NEW_USER_MUTATION, {
    firstName: user.imeKorisnika,
    lastName: user.prezimeKorisnika,
    height: user.visinaKorisnika,
    weight: user.tezinaKorisnika,
  });
}

async function updateUser(user) {
  console.log(user);
  await queryFetch(UPDATE_USER_MUTATION, {
    updateUserId: user.idKorisnika,
    firstName: user.imeKorisnika,
    lastName: user.prezimeKorisnika,
    height: user.visinaKorisnika,
    weight: user.tezinaKorisnika,
  });
}

async function deleteUser() {
  console.log(user);
  await queryFetch(DELETE_USER_MUTATION, { deleteUserId: user.idKorisnika });
}
