$(document).ready(function () {

  //validation function for submit tweets form
  function isTweetValid(tweet) {
    if (tweet === "" || tweet === null) {
      alert("Please enter text to submit")
      return false;
    }
    if (tweet.length > 140) {
      alert("Please enter a message that's less than 140 characters!")
      $('#tweet-text').val('');
      $('#charCounter').text('140');
      $('#charCounter').css('color', "grey")

      return false;
    }
    return true;
  }

  // subits form 
  $("#tweetsForm").on('submit', function (event) {
    event.preventDefault();
    const textAreaValue = $("textarea").val().trim();
    $('<textarea').text(textAreaValue); //prevents XSS or cross site scripting
    if (!isTweetValid(textAreaValue)) {
      return;
    }
    $.post("http://localhost:8080/tweets", $(this).serialize())
      .done(function () {
        loadTweets();
        $('#tweet-text').val('');
        $('#charCounter').text('140');
        $("#tweetsForm")[0].reset();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown)

      })
  });

  //gets form from server
  const loadTweets = function () {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' }) // grabs data from URL /tweets
      .then(function (data) { // upon success gets the data
        $('#tweets-container').empty();
        return renderTweets(data); // passes data to renderTweets
      })
      .catch(function (error) { // handles errors
        console.error('Error:', error);
      });
  };

  // the tweets paramater is passed the data from the tweets inside the server
  const renderTweets = function (tweets) {
    const $tweetContainer = $("#tweets-container"); //creates a variable to store the location of the id tag
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet); // creates new tweet withen adds it to a variable called $tweet 
      $tweetContainer.prepend($tweet); //adds a new updated tweet to be rendered on the page, displaying first instead of last each time a tweet is made
    });
  };

  //creates a function that takes in an object, and returns a tweet <article> element containing the entire html Structure of the tweet
  //
  const createTweetElement = function (tweet) {
    const timeagoForm = timeago.format(new Date(tweet.created_at));

    let $tweet = $(`
      <article class="articleFormatting">
        <header class="tweetHeader">
          <div class="nameSizeInTweets">
          <img src="${tweet.user.avatars}" class="tweetIconTopLeft"></img> ${tweet.user.name} 
          </div>
          <div class="usernameTweetColor">${tweet.user.handle}</div>
        </header>

        <div>
          <div class="tweetParagraphStyling">
          <p id="tweetsGoHereFromServer">${tweet.content.text}</p> 
        </div>

        <footer>
          <div class="seperateButtonAndCounterTweets">
            <div class="lastPostedTime">${timeagoForm}</div>
            <div class="smallIcons">
              <i class="fa-solid fa-flag hoverColourChange"></i>
              <i class="fa-solid fa-retweet hoverColourChange"></i>
              <i class="fa-solid fa-heart hoverColourChange"></i>
            </div>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  loadTweets();

  //helps override specificity for small tweet icon hover colours
  $(document).on("mouseover", ".hoverColourChange", function () {
    $(this).css("color", "yellow");
  }).on("mouseout", ".hoverColourChange", function () {
    $(this).css("color", "");
  });
});


