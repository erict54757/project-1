// on doc load

//firbase initialize
var config = {
  apiKey: "AIzaSyCzV3uup5hMyfXqML9oOb81r_dLQcUHlNk",
  authDomain: "feed-dcfe4.firebaseapp.com",
  databaseURL: "https://feed-dcfe4.firebaseio.com",
  projectId: "feed-dcfe4",
  storageBucket: "",
  messagingSenderId: "284436246284"
};
firebase.initializeApp(config);

var database = firebase.database();

//   global variables


//===============================================================================================
// firebase login stuff

var signUp = $("#sign-up");
var signIn = $("#sign-in");

$("#sign-up").on("click", function (event) {
  event.preventDefault();
  // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  var email = $("#exampleInputEmail1").val().trim();
  var password = $("#exampleInputPassword1").val().trim();


  console.log(email);
  console.log(password);
  // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;

  $(".form-control").val("")

database.ref().push({
  email: email,
  password: password,
});

});
// });





// sign in existing users
// firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
//   $("#sign-in").on("click");
// console.log($(this).text());

  // Handle Errors here.
  // var errorCode = error.code;
  // var errorMessage = error.message;

// });




// sidebar button clicks w/api calls

// card creation

// search functionality

// sign up new users
