$(document).ready(function() {
  var topics = ["aqua teen hunger force", "brooklyn 99", "metalocalypse", "Parks and Rec"];

  // create buttons from 'topics' array (display in buttonDiv)
  function renderButtons() {
    $("#buttonDiv").empty();
    for (var i = 0; i < topics.length; i++) {
      var t = $("<button>");
      t.addClass("topicBtn");
      t.attr("data-name", topics[i]);
      t.text(topics[i]);
      $("#buttonDiv").append(t);
    }
  }

  renderButtons();
  // (ajax call) generate 10 gifs (in gifDiv) for each button press
  //    - add functionality to stop (default) and play gifs when clicked
  //    - add rating text under the gif
  $("#buttonDiv").on("click", ".topicBtn", function() {
    var name = $(this).attr("data-name");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response.data;
      for (i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");
        gifImage.addClass("gif");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-state", "still");
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gifDiv").prepend(gifDiv);
      }
    });
  });

  $("#gifDiv").on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  // add searched tags to 'topics' array
  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val();
    topics.push(topic);
    renderButtons();
  });
});
