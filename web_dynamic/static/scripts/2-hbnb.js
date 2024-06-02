$(document).ready(function () {
  $.get("http://0.0.0.0:5001/api/v1/status/", function(data){
    if (data.status === 'OK') {
      $("div#api_status").addClass("available")
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
