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
        var maxGuest, numberRooms, numberBathrooms;
        if (place.max_guest != 1) {
          maxGuest = $('<div></div>').addClass('max_guest').text(place.max_guest + 'Guests')
        }
        else {
          maxGuest = $('<div></div>').addClass('max_guest').text(place.max_guest + 'Guest')
        }
        if (place.number_rooms != 1) {
          numberRooms = $('<div></div>').addClass('number_rooms').text(place.number_rooms + 'Bedrooms')
        }
        else {
          numberRooms = $('<div></div>').addClass('number_rooms').text(place.number_rooms + 'Bedroom')
        }
        if (place.number_bathrooms != 1) {
          numberBathrooms = $('<div></div>').addClass('number_bathrooms').text(place.number_bathrooms + 'Bathrooms')
        }
        else {
          numberBathrooms = $('<div></div>').addClass('number_bathrooms').text(place.number_bathrooms + 'Bathroom')
        }
        information.append(maxGuest).append(numberRooms).append(numberBathrooms);

        const user = $('<div></div>').addClass('user');
        const owner = $('<b></b>').text('Owner: ');
        $.get('http://localhost:5001/api/v1/users/' + place.user_id, function(data) {
          userFname = data.first_name;
          userLname = data.last_name
          owner.after(userFname + ' ' + userLname);
        });
        user.append(owner);

        const description = $('<div></div>').addClass('description').html(place.description);

        myArticle.append(titleBox).append(information).append(user).append(description);
        $('.places').append(myArticle);
        // console.log(place);
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
