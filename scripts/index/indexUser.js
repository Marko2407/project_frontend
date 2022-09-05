async function getCurrentUser() {
  const userQuery = await queryFetch(GET_CURRENT_USER_QUERY);
  console.log(userQuery);
  if (userQuery.data.getUser != null) {
    mapUserInfo(userQuery.data.getUser);
    return user;
  } else {
    return null;
  }
}

function mapUserInfo(response) {
  console.log(response);
  user.idKorisnika = response.id;
  user.imeKorisnika = response.firstName;
  user.prezimeKorisnika = response.lastName;
  user.visinaKorisnika = parseInt(response.height);
  user.tezinaKorisnika = parseInt(response.weight);
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
