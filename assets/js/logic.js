// on doc load
$(document).ready(function () {
  //=============================================================================================================
  //call to initialize
  var app_firebase = {};
  (function () {
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
  $(".button-check").on("click", function () {
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
      var btntitle = $("<h5>");
      $(btntitle).addClass("card-title text-center");
      $(btntitle).text(this.id);

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
        .then(function (response) {
          //TODO:
          //if statements creating styling for each API
          if ("#" + innerId === "redditInner") {

            var result = response.data.children;
            for (var i = 0; i < result.length; i++) {

              var articleDump = $("<div>");
              $(".disp-1").empty();

              var newDiv = $("<div class='container bg-danger rounded p-3 my-1'>");
              var title = $("<h3 class='text-light'>");

              var newSmall = $("<small class='text-light'>");
              var link = $("<a>");
              var badge = $("<span class='badge badge-dark mr-2'>");
              var redArticleUrl = result[i].data.url;

              badge.text(i + 1);
              title.text(result[i].data.title);
              newSmall.text("URL: " + redArticleUrl);
              link.html(newSmall).attr("href", redArticleUrl).attr('target', '_blank');


              title.prepend(badge);
              newDiv.append(title);
              newDiv.append(link);

              articleDump.append(newDiv);
              $(".disp-1").prepend(articleDump);
            }
          }
          $(div4).prepend(btntitle);
        })

     else if ("#" + innerId === "stackExchange") {

        var result = response.items

        for (var i = 0; 0 < result.length; i++) {

          var articleDump = $("<div>");
          $(".disp-1").empty();

          var newDiv = $("<div class='container bg-dark rounded p-3 my-1'>");
          var title = $("<h3 class='text-light'>");
          var link = $("<a>");
          var badge = $("<span class='badge badge-danger mr-2'>");
          var newSmall = $("<small class='text-light'>");
          var articleUrl = result[i].link;

          badge.text(i + 1);
          title.text(result[i].title);
          newSmall.text("URL: " + articleUrl)
          link.html(newSmall).attr("href", articleUrl).attr('target', '_blank');

          title.prepend(badge);
          newDiv.append(title);
          newDiv.append(link);

          articleDump.append(newDiv);
          $(".disp-1").prepend(articleDump);
        }
      }
      $(div4).prepend(btntitle);
    })

 else if ("#" + innerId === "hackerNews") {

    var result = response.articles
    for (var i = 0; i < result.length; i++) {

      var hackArticleDump = $("<div>");
      $(".disp-1").empty();

      var newDiv = $("<div class='container bg-dark rounded p-3 my-1'>");
      var title = $("<h3 class='text-light'>");
      var description = $("<small class='text-light'>")
      var newSmall = $("<small class='text-light'>");
      var link = $("<a>");
      var brk = $("<br>")
      var badge = $("<span class='badge badge-danger mr-2'>");
      var articleUrl = result[i].url;

      badge.text(i + 1);
      title.text(result[i].title);
      description.text(result[i].description);
      newSmall.text(result[i].author);
      link.html(title).attr("href", articleUrl).attr('target', '_blank');

      title.prepend(badge);
      newDiv.append(link);
      newDiv.append(description);
      newDiv.append(brk);
      newDiv.append(newSmall);

      hackArticleDump.append(newDiv);
      $(".disp-1").prepend(hackarticleDump);
    }
  }
  $(div4).prepend(btntitle);
})
 else if ("#" + innerId === "youTube") {

  var result = response.items
  for (var i = 0; i < result.length; i++) {
    // Creating a div for the videos
    var videoDiv = $("<div>");
    $(".disp-1").empty();

    var divContainer = $("<div class= 'container bg-dark text-white p-3 pl-2 my-2 col-5'>");
    var bdg = $("<span class='badge badge-white mr-2'>")
    var title = result[i].snippet.title;
    var vidID = result[i].id.videoId;

    var iframe = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidID + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'

    // Creating a paragraph tag with the result item's title and video
    bdg.text(i + 1);
    var p = $("<p>").text("Title: " + title).addClass("youtubeTitle");
    var vidIframe = $("<div>").html(iframe);

    // Appending the paragraph and personImage we created to the "videoDiv" div we created
    p.prepend(bdg);
    divContainer.append(p);
    divContainer.append(vidIframe);
    videoDiv.append(divContainer);
    $(".disp-1").prepend(videoDiv);
  }
}
$(div4).prepend(btntitle);
  })

 else if ("#" + innerId === "nyt") {
  var result = response.response.docs;

  for (var i = 0; i < result.length; i++) {

    var articleDump = $('<div>');
    $(".disp-1").empty();

    var newDiv = $("<div class='container bg-danger rounded p-3 my-1'>");
    var title = $("<h3 class='text-light'>");
    var link = $("<a>");
    var badge = $("<span class='badge badge-dark mr-2'>");
    var desc = $("<small class='text-light'>");
    var brk = $("<br>");
    var newSmall = $("<small class='text-light'>");
    var articleUrl = result[i].web_url;

    badge.text(i + 1);
    title.text(result[i].headline.main);
    link.html(title).attr("href", articleUrl).attr('target', '_blank');

    newSmall.text(result[i].byline.original);
    desc.text("Description: " + result[i].snippet);

    title.prepend(badge);
    newDiv.append(link);
    newDiv.append(desc);
    newDiv.append(brk);
    newDiv.append(newSmall);

    articleDump.append(newDiv);
    $(".disp-1").prepend(articleDump);
  }
}
$(div4).prepend(btntitle);
    })

 else if ("#" + innerId === "giphy") {
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
$("#search").on("click", function () {
  var input = $("#addButton").val().trim();
  //global funtion array
  //push card id to array on button click/ remove if inactive
  //for each ite m in array if id exists on page create search url
  //open search url in card based on id
  var youtubeURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=moderate&q=" + input + "&type=video&order=relevance&maxResults=10&key=AIzaSyB9iTGjZQ4ys1x9-h2X2i_yoGON2u8YsCo"
  var hackerURL = "https://newsapi.org/v2/top-headlines?sources=hacker-news&sortBy=popularity&keyword=" + input + "&apiKey=8ff761229c714da0ad73442ee4507c1d"
  var redditURL = "https://www.reddit.com/search.json?q=" + input + "&t=all&sort=recent&limit=10&apiKey=Ky0R8Y90Gwg6ZJ2K996wd9hH7DM"
  var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + input + "&fq=10&api-key=b9f91d369ff59547cd47b931d8cbc56b%3A0%3A74623931"
  var stackExchangeURL = "https://api.stackexchange.com/2.2/questions?q" + input + "=&order=desc&sort=activity&site=stackoverflow&key=rjcMcQhVeLRQ0ZhQziUIbQ(("
  var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=dc6zaTOxFJmzC&limit=10"

});
});
// if (div exists){
// ajax call
// then
// display data
// }


// search functionality
$("#search").on("click", function () {
  var input = $("#addButton")
    .val()
    .trim();
  var youtubeURL =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=moderate&q=" +
    input +
    "&type=video&order=relevance&maxResults=10&key=AIzaSyB9iTGjZQ4ys1x9-h2X2i_yoGON2u8YsCo";

  //global funtion array
  //push card id to array on button click/ remove if inactive
  //for each ite m in array if id exists on page create search url
  //open search url in card based on id
  $(".disp-1")
    .empty()
    .append(function () {
      if (id === "redditInner") {
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) { });
      }
      if (id === "stackExchangeInner") {
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) { });
      }
      if (id === "hackerNewsInner") {
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) { });
      }
      if (id === "youTubeInner") {
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) { });
      }
      if (id === "nytInner") {
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) { });
      }
      if (id === "giphyInner") {
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function (response) { });
      }
    });