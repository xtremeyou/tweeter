$(document).ready(function () {

  $('#tweet-text').on('keyup', function (event) {
    const maxLength = 140;
    const count = $('.counter')
    const currentLength = $(this).val().length;
    const totalCount = maxLength - currentLength;
    count.text(totalCount);

    if (totalCount <= 0) {
      count.css('color', 'red')
    } else {
      count.css('color', '')
    }
  })
});

