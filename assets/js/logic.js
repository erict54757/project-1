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

//   global variables


//===============================================================================================
// firebase login stuff
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

$("#sign-up").on("click", createUserWithEmailAndPassword);
console.log($(this).text());

// sign in existing users
firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

$("#sign-in").on("click", signInWithEmailAndPassword);
console.log($(this).text());


// sidebar button clicks w/api calls

// card creation

// search functionality

// sign up new users
