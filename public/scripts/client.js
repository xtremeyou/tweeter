const { serialize } = require("v8");
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
$(document).ready(function () {


  $("#tweetsForm").on('submit', function (event) {
    event.preventDefault();
    $.post("http://localhost:8080/tweets", $("#tweetsForm").serialize());
  })



  //helps override specificity
  $(document).on("mouseover", ".hoverColourChange", function () {
    $(this).css("color", "yellow");
  }).on("mouseout", ".hoverColourChange", function () {
    $(this).css("color", "");
  });


  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

  //
  const renderTweets = function (tweets) {
    const $tweetContainer = $("#tweets-container");

    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet);
      $tweetContainer.append($tweet);
    });
  };

  //creates a function that takes in an object, and returns a tweet <article> element containing the entire html Structure of the tweet
  //
  const createTweetElement = function (tweet) {
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
            <div class="lastPostedTime">${tweet.created_at}</div>
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

  renderTweets(data);
});
