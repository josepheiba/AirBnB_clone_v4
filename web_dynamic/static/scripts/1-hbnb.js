$(document).ready(function () {
  $('input[type=checkbox]').change(function () {
	const selectedAmenities = {};
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
	} else {
      delete selectedAmenities[amenityId];
	}
  });
});
