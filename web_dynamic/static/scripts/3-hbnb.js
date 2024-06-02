$(document).ready(function () {
  $.get("http://localhost:5001/api/v1/status/", function(data) {
    if (data.status === 'OK') {
      $("div#api_status").addClass("available")
    }
  });

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(data) {
      for (const place of data) {
        const myArticle = $('<article></article>');
        const titleBox = $('<div></div>').addClass('title_box');
        const placeName = $('<h2></h2>').text(place.name);
        const placePrice = $('<div></div>').addClass('price_by_night').text(place.price_by_night);
        titleBox.append(placeName).append(placePrice);

        const information = $('<div></div>').addClass('information');

        const user = $('<div></div>').addClass('user');

        const description = $('<div></div>').addClass('description');

        myArticle.append(titleBox).append(information).append(user).append(description);
        $('.places').append(myArticle);
        console.log(place);
      }
    }
  });

  const selectedAmenities = {};
  $('input[type=checkbox]').change(function () {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }
    console.log(selectedAmenities);
    const amenityList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenityList || '\u00A0');
  });
});
