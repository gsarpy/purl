// add an event listener to shorten button
$('.btn-shorten').on('click', function(){
	// AJAX call to api/shorten with the user provided URL
	$.ajax({
		url: '/api/shorten',
		type: 'POST',
		dataType: 'JSON',
		data: {url: $('#url-field').val()},
		success: function(data){
			// display the shortened URL
			var resultHTML = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>';
			$('#link').html(resultHTML);
			$('#link').hide().fadeIn('slow');
		}
	});
});
