//I want it to hide before page load
$('#errorHandlingMessage').hide();
$('.new-tweet').hide();



$(document).ready(function () {

  //changes cursor to a pointer when hovering over write a new tweet button to elt user know they can click it
  $('.iconContainer').css('cursor', 'pointer');

  //write on click of nav class clickToSHowAndHideTweetForm to show the tweet section class new-tweet
  $('.iconContainer').on('click', function (event) {
    $('.new-tweet').slideToggle(200);
  })


  //validation function for submit tweets form
  function isTweetValid(tweet) {
    let errorMessages = $('#errorHandlingMessage')
    if (tweet === "" || tweet === null) {
      errorMessages.html("<i class='fa-solid fa-triangle-exclamation'></i><label> Please enter text to submit tweet! </label>").slideDown(200);
      return false;
    }
    if (tweet.length > 140) {
      errorMessages.html("<i class='fa-solid fa-triangle-exclamation'></i><label> Please enter a message that's less than 140 characters! </label>").slideDown(200)
      return false;
    }
    return true;
  }

  // submits form 
  $("#tweetsForm").on('submit', function (event) {
    event.preventDefault();
    const textAreaValue = $("textarea").val().trim();
    $('<textarea>').text(textAreaValue); //prevents XSS or cross site scripting
    if (!isTweetValid(textAreaValue)) {
      return false;
    }
    $.post("/tweets", $(this).serialize())
      .done(function () {
        loadTweets();
        $('#errorHandlingMessage').slideUp(200);
        $('#tweet-text').val('');
        $('#charCounter').text('140');
        $('#charCounter').removeClass('red');
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown)

      })
  });

  //gets form from server
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' }) // grabs data from URL /tweets
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


