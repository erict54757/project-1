// on doc load
$(document).ready(function() {
  //=============================================================================================================
  //call to initialize
  var app_firebase = {};
  (function() {
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
  })();
  //==================================================================================================
  var count = 0;
  var idArray = [];

  // sidebar button clicks w/api calls
  $(".button-check").on("click", function() {
    console.log(this.id);
    var cardId = this.id + "Card";
    var innerId = this.id + "Inner";
    if (this.dataset.state === "inactive") {
      if (count > 1) {
        $(div1)
          .removeClass("carousel-item active")
          .addClass("carousel-item");
      }
      $(".carousel-item").removeClass("active");

      var div1 = $("<div>");
      $(div1).addClass("carousel-item active");
      $(div1).attr("id", cardId);
      var div2 = $("<div>");
      $(div2).addClass("mb-4 card-div");
      var div3 = $("<div id=card-1>");
      $(div3).addClass("card rounded shadow-lg");
      var div4 = $("<div>");
      $(div4).addClass("card-body disp-1");
      $(div1).attr("id", innerId);
      var title = $("<h5>");
      $(title).addClass("card-title text-center");
      $(title).text(this.id);

      $(div3).append(div4);
      $(div2).append(div3);
      $(div1).append(div2);
      $(".div0").prepend(div1);

      count++;
      // Constructing a URL to search Giphy for the name of the person who said the quote
      this.dataset.state = "active";
      var queryURL = this.dataset.url;

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          //TODO:
          //if statements creating styling for each API
          if ("#" + innerId === "redditInner") {

          } else if ("#" + innerId === "stackExchange") {

          } else if ("#" + innerId === "stackExchange") {

          } else if ("#" + innerId === "hackerNews") {

          } else if ("#" + innerId === "youTube") {

          } else if ("#" + innerId === "nyt") {
            
          } else if ("#" + innerId === "giphy") {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
              // Creating a div for the gif
              var gifDiv = $("<div>");
              $(".disp-1").empty();

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
          }
          $(div4).prepend(title);
        });
    } else if (this.dataset.state === "active") {
      $("#" + cardId).remove();
      this.dataset.state = "inactive";
    }
  });

  // search functionality
  $("#search").on("click", function() {
    var input = $("#addButton").val().trim();
    //global funtion array
    //push card id to array on button click/ remove if inactive
    //for each ite m in array if id exists on page create search url
    //open search url in card based on id
    var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=moderate&q=" + input + "&type=video&order=relevance&maxResults=10&key=AIzaSyB9iTGjZQ4ys1x9-h2X2i_yoGON2u8YsCo"

  });
});
// if (div exists){
  // ajax call
  // then
  // display data
// }