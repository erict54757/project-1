// on doc load
$(document).ready(function() {
  //=============================================================================================================
  //call to initialize
  var app_firebase = {};
 (function(){
 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyCzV3uup5hMyfXqML9oOb81r_dLQcUHlNk",
   authDomain: "feed-dcfe4.firebaseapp.com",
   databaseURL: "https://feed-dcfe4.firebaseio.com",
   projectId: "feed-dcfe4",
   storageBucket: "feed-dcfe4.appspot.com",
   messagingSenderId: "284436246284"
 };
 firebase.initializeApp(config);

 firebase_app = firebase;

})()
//login stuff
(function() {
  // Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "dashboard.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
})();

//logout stuff
var mainApp = {};

(function(){
    var firebase = firebase_app;
    var uid = null;
    
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
    }else{
        //redirect to login page
        uid = null;
        window.location.replace("index.html");
    }
  });

  function logOut(){
      firebase.auth().signOut();
  }

  mainApp.logOut = logOut;

})()

//==================================================================================================


  // sidebar button clicks w/api calls
  $(".button-check").on("click", function() {
    console.log(this.id);
    var div1 = $("<div>");
        $(div1).addClass("carousel-item active");
        var div2 = $("<div>");
        $(div2).addClass("mb-4 card-div");
        var div3 = $("<div>");
        $(div3).addClass("card rounded shadow-lg");
        var div4 = $("<div>");
        $(div4).addClass("card-body disp-1");
        var title = $("<h5>");
        $(title).addClass("card-title text-center")
        $(title).text(this.id);
        
        $(div3).append(div4);
        $(div2).append(div3);
        $(div1).append(div2);
        $(".div0").append(div1);
    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = this.dataset.url;

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;
        console.log(results);
        // Looping over every result item
        for (var i = 0; i < results.length; i++) {
          // Creating a div for the gif
          var gifDiv = $("<div>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var personImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $(".disp-1").prepend(gifDiv);
        }
        $(div4).prepend(title);
      });
      
  });
  // card creation

  // search functionality

  // sign up new users
});
