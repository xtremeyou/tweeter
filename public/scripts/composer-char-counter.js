$(document).ready(function () {

  $('#tweet-text').on('keydown', function (event) {
    const maxLength = 140;
    const count = $('.counter')
    const currentLength = $(this).val().length;
    const totalCount = maxLength - currentLength;
    count.text(totalCount);

    if (totalCount <= 0) {
      count.addClass('red')
    } else if (totalCount > 0 || totalCount === 140) {
      count.removeClass('red')
    }
  })
});



