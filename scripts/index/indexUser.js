async function getCurrentUser(uuid) {
  const userQuery = await queryFetch(GET_CURRENT_USER_QUERY, {
    userId: uuid,
  });
  console.log(userQuery);
  if (userQuery.data.getUser != null) {
    mapUserInfo(userQuery.data.getUser);
    return user;
  } else {
    return null;
  }
}

async function loginUserQuery(username, password) {
  const queryResponse = await queryFetch(GET_LOGIN_USER, {
    username: username,
    password: password,
  });
  const response = queryResponse.data.loginUser;

  if (response != null) {
    mapUserInfo(response);
    return response;
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
  const response = await queryFetch(CREATE_NEW_USER_MUTATION, {
    firstName: user.imeKorisnika,
    lastName: user.prezimeKorisnika,
    height: user.visinaKorisnika,
    weight: user.tezinaKorisnika,
    username: user.korisnickoIme,
    password: user.lozinkaKorisnika,
  });
  const result = response.data.createUser;
  if (result != null) {
    mapUserInfo(result);
    return result;
  } else {
    return null;
  }
}

async function updateUser(user, uuid) {
  console.log(user);
  const response = await queryFetch(UPDATE_USER_MUTATION, {
    updateUserId: uuid,
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
