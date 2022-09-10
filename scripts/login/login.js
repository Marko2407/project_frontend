// dohvati inpute 

let uuid = Cookies.get("uuid");
console.log(uuid);
if(uuid != undefined){
    odvedi ga na pocetnu
}

JsLoadingOverlay.setOptions({
  overlayBackgroundColor: "#666666",
  overlayOpacity: 0.6,
  spinnerIcon: "ball-spin-clockwise",
  spinnerColor: "#000",
  spinnerSize: "2x",
  overlayIDName: "overlay",
  spinnerIDName: "spinner",
  offsetY: 0,
  offsetX: 0,
  lockScroll: false,
  containerID: null,
});


async function loginUser(username, password) {
  JsLoadingOverlay.show();
  const result = await queryFetch(GET_LOGIN_USER, {
    username: username,
    password: password,
  });
  const response = result.data.loginUser;
  console.log(result);
  if (result != null) {
    Cookies.set(uuid, response.userId);
   //odvedi na pocetnu
  }else{
    // ili user ne postoji ili je krivi username ili password u biti prikazi unknown error
  }
    JsLoadingOverlay.hide();
}



async function RegisterUser(date = new Date()) {
  JsLoadingOverlay.show();
    const result = createNewUser(user);
  const response = result.data.createNewUser;
  console.log(result);
  if (response != null) {
    Cookies.set(uuid, response.userId)
    mapUserInfo(response.createNewUser);
    //odvedi na pocetnu stranicu 
  }else{
    // username vec postoji ! 
  }
    JsLoadingOverlay.hide();
}


// set click listener on login btn to call loginUser function and to register new user



