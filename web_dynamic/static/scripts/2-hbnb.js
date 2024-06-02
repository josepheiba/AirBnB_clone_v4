$(document).ready(function () {
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
