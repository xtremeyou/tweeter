$(document).ready(function () {

  $('#tweet-text').on('keydown', function (event) {
    const count = $('.counter')
    let newTotal = parseInt(count.text());
    newTotal -= 1;
    count.text(newTotal);

    if (newTotal <= 0) {
      count.css('color', 'red')
    } else {
      count.css('color', '')
    }
  })
});

