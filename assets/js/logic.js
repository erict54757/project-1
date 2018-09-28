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

// firebase login stuff
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: "<url-to-redirect-to-on-success>",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
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
ui.start("#firebaseui-auth-container", uiConfig);
//email

//google /autosignin stuff
window.onGoogleYoloLoad = (googleyolo) => {
    // The 'googleyolo' object is ready for use.
  };
  const retrievePromise = googleyolo.retrieve({
    supportedAuthMethods: [
      "https://accounts.google.com",
      "googleyolo://id-and-password"
    ],
    supportedIdTokenProviders: [
      {
        uri: "https://accounts.google.com",
        clientId: "YOUR_GOOGLE_CLIENT_ID"
      }
    ]
  });
  //if chose different method
  googleyolo.cancelLastOperation().then(() => {
    // Credential selector closed.
  });

  retrievePromise.then((credential) => {
    if (credential.password) {
      // An ID (usually email address) and password credential was retrieved.
      // Sign in to your backend using the password.
      signInWithEmailAndPassword(credential.id, credential.password);
    } else {
      // A Google Account is retrieved. Since Google supports ID token responses,
      // you can use the token to sign in instead of initiating the Google sign-in
      // flow.
      useGoogleIdTokenForAuth(credential.idToken);
    }
  }, (error) => {
    // Credentials could not be retrieved. In general, if the user does not
    // need to be signed in to use the page, you can just fail silently; or,
    // you can also examine the error object to handle specific error cases.
  
    // If retrieval failed because there were no credentials available, and
    // signing in might be useful or is required to proceed from this page,
    // you can call `hint()` to prompt the user to select an account to sign
    // in or sign up with.
    if (error.type === 'noCredentialsAvailable') {
      googleyolo.hint(...).then(...);
    }
  });

  //onsignout

  disableAutoSignIn().then(() => {
    // Auto sign-in disabled.
  });
//facebook
//twitter
//github

// sidebar button clicks w/api calls

// card creation

// search functionality
