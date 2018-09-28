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

// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "https://erict54757.github.io/One-feed/dashboard.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.

    //google
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,

    //facebook
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,

    //twitter
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,

    //github
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,

    //email
    firebase.auth.EmailAuthProvider.PROVIDER_ID,

    //phone
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,

    //anonymous
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign("<your-privacy-policy-url>");
  }
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
}

//track auth state across all pages
initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('sign-in').textContent = 'Sign out';
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});

//============================================================================================

// sidebar button clicks w/api calls

// card creation

// search functionality
