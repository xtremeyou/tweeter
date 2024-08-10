$(document).ready(function () {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  //
  const renderTweets = function (tweets) {
    const $tweetContainer = $('#tweets-container');

    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);

      $tweetContainer.append($tweet);
    })
  }

  //creates a function that takes in an object, and returns a tweet <article> element containing the entire html Structure of the tweet
  //
  const createTweetElement = function (tweet) {
    let $tweet = $(`
     <section class="showTweetsHere">
      <article>
        <header class="tweetHeader">
          <div class="nameSizeInTweets">
          <img src="${tweet.user.avatars}"></img> ${tweet.user.name} 
          </div>
          <div class="usernameTweetColor">${tweet.user.handle}</div>
        </header>

        <div>
          <section class="new-tweet">
            <div>
              <div id="tweet-text" class="tweetParagraphStyling">
                <p id="tweetsGoHereFromServer">${tweet.content.text}</p> 
            </div>
          </section>
        </div>

        <footer>
          <div class="seperateButtonAndCounter">
            <div class="lastPostedTime">${tweet.created_at}</div>
            <div class="smallIcons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        </footer>

      </article>
    </section>
    `);
    return $tweet;

  };


  renderTweets(data);

});