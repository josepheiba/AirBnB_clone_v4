$(document).ready(function () {
  $.get("http://localhost:5001/api/v1/status/", function(data) {
    if (data.status === 'OK') {
      $("div#api_status").addClass("available");
    }
  });

  const selectedAmenities = {};
  const selectedStates = {};
  const selectedCities = {};

  function updateLocationsHeader() {
    const combinedList = [...Object.values(selectedStates), ...Object.values(selectedCities)].join(', ');
    $('.locations h4').text(combinedList || '\u00A0'); // Use non-breaking space if empty
  }

// Event listener for checkbox changes
  $('input[type="checkbox"]').change(function() {
    const dataType = $(this).hasClass('state-checkbox') ? 'state' : (
      $(this).hasClass('city-checkbox') ? 'city' : 'amenity'
    );
    const dataId = $(this).data('id');
    const dataName = $(this).data('name');

    if (dataType === 'state') {
      if (this.checked) {
        selectedStates[dataId] = dataName;
      } else {
          delete selectedStates[dataId];
      }
      updateLocationsHeader();
    } else if (dataType === 'city') {
        if (this.checked) {
          selectedCities[dataId] = dataName;
        } else {
            delete selectedCities[dataId];
        }
        updateLocationsHeader();
    } 
    if (dataType === 'amenity') {
        if (this.checked) {
          selectedAmenities[dataId] = dataName;
        } else {
            delete selectedAmenities[dataId];
        }
        const amenityList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenityList || '\u00A0'); // Use non-breaking space if empty
      }
    }); 

  function fetchPlaces(filters) {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(filters),
    success: function(data) {
      $('.places').empty();
      for (const place of data) {
        const myArticle = $('<article></article>');
        const titleBox = $('<div></div>').addClass('title_box');
        const placeName = $('<h2></h2>').text(place.name);
        const placePrice = $('<div></div>').addClass('price_by_night').text(place.price_by_night);
        titleBox.append(placeName).append(placePrice);

        const information = $('<div></div>').addClass('information');
        const maxGuest = $('<div></div>').addClass('max_guest').text(
          `${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`
        );
        const numberRooms = $('<div></div>').addClass('number_rooms').text(
          `${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`
        );
        const numberBathrooms = $('<div></div>').addClass('number_bathrooms').text(
          `${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`
        );
        information.append(maxGuest).append(numberRooms).append(numberBathrooms);

        const user = $('<div></div>').addClass('user');
        const owner = $('<b></b>').text('Owner: ');
        $.get(`http://localhost:5001/api/v1/users/${place.user_id}`, function(userData) {
          const userFname = userData.first_name;
          const userLname = userData.last_name;
          owner.append(`${userFname} ${userLname}`);
        });
        user.append(owner);

        const description = $('<div></div>').addClass('description').html(place.description);

        myArticle.append(titleBox).append(information).append(user).append(description);
        $('.places').append(myArticle);
      }
    }
  });
  };

  fetchPlaces({});

  $('button').click(function() {
    const filters = {
      amenities: Object.keys(selectedAmenities),
      states: Object.keys(selectedStates),
      cities: Object.keys(selectedCities)
    };
    fetchPlaces(filters);
  });
});
