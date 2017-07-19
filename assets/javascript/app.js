const API_KEY = '5f90142d4f8c4e5babf95a1f62c67a5a';
const URL = 'https://api.giphy.com/v1/gifs/search?q=';
const RESULTS_LIMIT = 10;

var topics = [
  'basketball',
  'football',
  'soccer',
  'hockey',
  'baseball',
  'baseketball'
];

displayButtons();
// apend original topics list buttons
function displayButtons(){
  $('#buttons').empty();

  topics.forEach((topic) => {
    var but = $('<button class="gif-button ui button primary" id="' + topic + '">' + topic + '</button>');
    $('#buttons').append(but);
  });
}

// gif button click handler
$(document).on('click', '.gif-button', function () {
  var searchTerm = ($(this).attr('id'));

  // API call
  fetch(URL + searchTerm + '&api_key=' + API_KEY + '&limit=' + RESULTS_LIMIT).then(function (response) {
    return response.json();
  }).then(function (data) {
    displayGifs(data.data);
  });
});

function displayGifs (gifs) {
  // clear out existing gifs
  $('#main').html('');

  var gifs = gifs;
  gifs.forEach((gif, index) => {
    // var url_image_clicked = gif.images.fixed_width.url
    var url_image_still = gif.images.fixed_width_still.url;
    var image_div = '<div class="img-div">';
    image_div = image_div + '<div class="caption">Rating: ' + gif.rating + '</div>';
    image_div = image_div +'<img id="' + index + '" src="' + url_image_still + '">';
    image_div = image_div + '</div>';

    // var image = $('<img id="' + index + '" src="' + url_image_still + '">');
    var image = $(image_div);
    $('#main').append(image);
  });

  // click listener
  $('img').on('click', function () {
    var index = $(this).attr('id');
    console.log(index);

    if ($(this).hasClass('clicked')) {
      $(this).attr('src', gifs[index].images.fixed_width_still.url);
    } else {
      $(this).attr('src', gifs[index].images.fixed_width.url);
    }
    $(this).toggleClass('clicked');
  });
}

$('#submit-btn').on('click', () => {
  var newTopic = $('#search').val();
  topics.push(newTopic);
  displayButtons();
});
