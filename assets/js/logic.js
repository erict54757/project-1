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
  //=============================================================================================================
  // menu button clicks
  //=============================================================================================================
  var count = 0;
  var idArray = [];
$(".carousel").carousel({interval:false});
  // sidebar button clicks w/api calls
  $(".button-check").on("click", function() {
    var thatCount= 0;
    // Hides start place holder image
    $("#startImage").hide();
    var that= this
    console.log(this.id);
    var cardId = this.id + "Card";
    var innerId = this.id + "Inner";
    if (this.dataset.state === "inactive") {
      
      $(".carousel-item").removeClass("active");

      var div1 = $("<div>");
      $(div1).addClass("carousel-item active");
      $(div1).attr("id", cardId);
      $(div1).attr("data-num", count);
      var div2 = $("<div>");
      $(div2).addClass("card-div");
      var div3 = $("<div id=card-1>");
      $(div3).addClass("card rounded shadow-lg");
      var div4 = $("<div id = '" + innerId + "'>");
      $(div4).addClass("card-body disp-1 px-lg-3");
      // $(div4).attr("id", innerId);
      console.log(div4);
      var btnTitle = $("<h5>");
      $(btnTitle).addClass("card-title text-center");
      $(btnTitle).text(this.id);

      $(div3).append(div4);
      $(div2).append(div3);
      $(div1).append(div2);
      $(".div0").prepend(div1);

      count++;
      // Constructing a URL to search Giphy for the name of the person who said the quote
      this.dataset.state = "active";
      thatCount++
      var queryURL = this.dataset.url;

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          //=========================================================================================================================
          //display and styling
          //===========================================================================================================================

          function Reddit() {
            var result = response.data.children;
            $("#" + innerId).empty();
            for (var i = 0; i < result.length; i++) {
              var articleDump = $("<div>");

              var newDiv = $(
                "<div class='container bg-dark rounded p-3 my-1'>"
              );
              var title = $("<h3 class='text-light'>");

              var newSmall = $("<small class='text-light'>");
              var link = $("<a>");
              var badge = $("<span class='badge badge-primary mr-2'>");
              var redArticleUrl = result[i].data.url;

              badge.text(i + 1);
              title.text(result[i].data.title);
              newSmall.text("URL: " + redArticleUrl);
              link
                .html(newSmall)
                .attr("href", redArticleUrl)
                .attr("target", "_blank");

              title.prepend(badge);
              newDiv.append(title);
              newDiv.append(link);
              

              articleDump.append(newDiv);
              $("#" + innerId).append(articleDump);
            }
          }

          if (innerId === "RedditInner") {
            Reddit();
          } else if (innerId === "Stack-ExchangeInner") {
            var result = response.items;
            $("#" + innerId).empty();
            for (var i = 0; i < result.length; i++) {
              var articleDump = $("<div>");

              var newDiv = $(
                "<div class='container bg-dark rounded p-3 my-1'>"
              );
              var title = $("<h3 class='text-light'>");
              var link = $("<a>");
              var badge = $("<span class='badge badge-primary mr-2'>");
              var newSmall = $("<small class='text-light'>");
              var articleUrl = result[i].link;

              badge.text(i + 1);
              title.text(result[i].title);
              newSmall.text("URL: " + articleUrl);
              link
                .html(newSmall)
                .attr("href", articleUrl)
                .attr("target", "_blank");

              title.prepend(badge);
              newDiv.append(title);
              newDiv.append(link);

              articleDump.append(newDiv);
              $("#" + innerId).append(articleDump);
            }
          } else if (that.id === "Hacker-News") {
            var result = response.articles;
            $("#" + innerId).empty();
            for (var i = 0; i < result.length; i++) {
              var hackArticleDump = $("<div>");

              var newDiv = $(
                "<div class='container bg-dark rounded p-3 my-1'>"
              );
              var title = $("<h3 class='text-light'>");
              var description = $("<small class='text-light'>");
              var newSmall = $("<small class='text-light'>");
              var link = $("<a>");
              var brk = $("<br>");
              var badge = $("<span class='badge badge-primary mr-2'>");
              var articleUrl = result[i].url;

              badge.text(i + 1);
              title.text(result[i].title);
              description.text(result[i].description);
              newSmall.text(result[i].author);
              link
                .html(title)
                .attr("href", articleUrl)
                .attr("target", "_blank");

              title.prepend(badge);
              newDiv.append(link);
              newDiv.append(description);
              newDiv.append(brk);
              newDiv.append(newSmall);

              hackArticleDump.append(newDiv);
              $("#" + innerId).append(hackArticleDump);
            }
          } else if (that.id === "YouTube") {
            var result = response.items;
            $("#" + innerId).empty();
            for (var i = 0; i < result.length; i++) {
              // Creating a div for the videos
              var videoDiv = $("<div>");

              var divContainer = $(
                "<div class= 'container bg-dark text-white rounded p-3 pl-2 my-2'>"
              );
              var bdg = $("<span class='badge badge-primary mr-2'>");
              
              var vidID = result[i].id.videoId;

              var iframe =
                '<iframe class="rounded col-12" width="560" height="315" src="https://www.youtube.com/embed/' +
                vidID +
                '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>';

             
              var vidIframe = $("<div class='col-md-6 offset-md-3 d-flex justify-content-center'>").html(iframe);

              
              divContainer.append(vidIframe);
              videoDiv.append(divContainer);
              $("#" + innerId).append(videoDiv);
            }
          } else if (that.id === "New-York-Times") {
            var result = response.response.docs;
            $("#" + innerId).empty();
            for (var i = 0; i < result.length; i++) {
              var articleDump = $("<div>");

              var newDiv = $(
                "<div class='container bg-dark rounded p-3 my-1'>"
              );
              var title = $("<h3 class='text-light'>");
              var link = $("<a>");
              var badge = $("<span class='badge badge-primary mr-2'>");
              var desc = $("<small class='text-light'>");
              var brk = $("<br>");
              var newSmall = $("<small class='text-light'>");
              var articleUrl = result[i].web_url;

              badge.text(i + 1);
              title.text(result[i].headline.main);
              link
                .html(title)
                .attr("href", articleUrl)
                .attr("target", "_blank");

              newSmall.text(result[i].byline.original);
              desc.text("Description: " + result[i].snippet);

              title.prepend(badge);
              newDiv.append(link);
              newDiv.append(desc);
              newDiv.append(brk);
              newDiv.append(newSmall);

              articleDump.append(newDiv);
              $("#" + innerId).append(articleDump);
            }
          } else if (that.id === "Giphy") {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log(results);
            $("#" + innerId).empty();
            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
              // Creating a div for the gif
              var gifDiv = $("<div col-12>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p class='col-12 d-flex justify-content-center'>").text("Rating: " + rating);
              var personImage = $("<img class='col-sm-6 offset-sm-3 rounded'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#" + innerId).append(gifDiv);
            }
          }
          $(div4).prepend(btnTitle);
        });  
    
    } else if (this.dataset.state === "active") {
     

      if ($("#" + cardId).hasClass("active")) {
        $(".div0").carousel("prev");
        $("#" + cardId).remove();
        this.dataset.state = "inactive";
         if ( ( $("#Giphy").data("state")==="inactive") && ($("#Reddit").data("state")==="inactive") &&( $("#Stack-Exchange").data("state")==="inactive") &&( $("#Hacker-News").data("state")==="inactive") &&( $("#YouTube").data("state")==="inactive" )&&( $("#New-York-Times").data("state")==="inactive")&& $(".carousel-item").hasClass("active")===false){
       $("#startImage").show();
       console.log($("#hackerNews").data("state"));
       console.log($("#Reddit").data("state"));
       console.log($("#nyt").data("state"));
       console.log($("#stackExchange").data("state"));
       console.log($("#youTube").data("state"));
       console.log($("#giphy").data("state"));
       console.log($(".carousel-item"))
     } 
        
      } else {
        $("#" + cardId).remove();
        this.dataset.state = "inactive";
        

      }        
         }    
         
   
    // } $("#startImage").hide();
 
  });
  //=====================================================================================================================================
  // search functionality
  //===================================================================================================================================
  $("#search").on("click", function() {
    var input = $("#addButton")
      .val()
      .trim();
    var youtubeURL =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&safeSearch=moderate&q=" +
      input +
      "&type=video&order=relevance&maxResults=10&key=AIzaSyB9iTGjZQ4ys1x9-h2X2i_yoGON2u8YsCo";
    var hackerURL =
      "https://newsapi.org/v2/top-headlines?sources=hacker-news&sortBy=popularity&keyword=" +
      input +
      "&apiKey=8ff761229c714da0ad73442ee4507c1d";
    var RedditURL =
      "https://www.Reddit.com/search.json?q=" +
      input +
      "&t=all&sort=recent&limit=10&apiKey=Ky0R8Y90Gwg6ZJ2K996wd9hH7DM";
    var nytURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      input +
      "&fq=10&api-key=b9f91d369ff59547cd47b931d8cbc56b%3A0%3A74623931";
    var stackExchangeURL =
      "https://api.stackexchange.com/2.2/questions?q" +
      input +
      "=&order=desc&sort=activity&site=stackoverflow&key=rjcMcQhVeLRQ0ZhQziUIbQ((";
    var giphyURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      input +
      "&api_key=dc6zaTOxFJmzC&limit=10";

    $(".disp-1")
      .empty()
      .append(function() {
        if (id === "RedditInner") {

//=====================================================================================================
// se above lines... empty the div things display in by class (maybe use .replace() instead)
// rebuild the innermost div below
//===================================================================================================

          $.ajax({
            url: RedditURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {
              var result = response.data.children;
            $("#" + innerId).empty();
            for (var i = 0; i < result.length; i++) {
              var articleDump = $("<div>");

              var newDiv = $(
                "<div class='container bg-dark rounded p-3 my-1'>"
              );
              var title = $("<h3 class='text-light'>");

              var newSmall = $("<small class='text-light'>");
              var link = $("<a>");
              var badge = $("<span class='badge badge-primary mr-2'>");
              var redArticleUrl = result[i].data.url;

              badge.text(i + 1);
              title.text(result[i].data.title);
              newSmall.text("URL: " + redArticleUrl);
              link
                .html(newSmall)
                .attr("href", redArticleUrl)
                .attr("target", "_blank");

              title.prepend(badge);
              newDiv.append(title);
              newDiv.append(link);

              articleDump.append(newDiv);
              $("#" + innerId).append(articleDump);
            }
            });
        }
        if (id === "stackExchangeInner") {
          $.ajax({
            url: stackExchangeURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {});
        }
        if (id === "hackerNewsInner") {
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {});
        }
        if (id === "youTubeInner") {
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {});
        }
        if (id === "nytInner") {
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {});
        }
        if (id === "giphyInner") {
          $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {});
        }
      });
  });
});