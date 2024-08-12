$(document).ready(function () {

  $("#tweetsForm").on('submit', function (event) {
    event.preventDefault();
    const textAreaValue = $("textarea").val();
    if (textAreaValue === "" || textAreaValue === null) {
      alert("Please enter text to submit")
      return;
    }
    if (textAreaValue.length > 140) {
      alert("Please enter a message that's less than 140 characters!")
      return;
    }
    $.post("http://localhost:8080/tweets", $(this).serialize(), function () {
      loadTweets();
    })
  });

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
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
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

  timeAgo.format(Date.now() - 10 * 1000, customStyle)

  //helps override specificity for small tweet icon hover colours
  $(document).on("mouseover", ".hoverColourChange", function () {
    $(this).css("color", "yellow");
  }).on("mouseout", ".hoverColourChange", function () {
    $(this).css("color", "");
  });
});


