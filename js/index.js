$(document).ready(function() {
	$.voiceDebug = true;

	$('#submitMessage').click(function() {
		$.apiRequest($('#messageText').val());
		$('#loadingImg').show();
		$('.micImg').fadeOut();
	});

	$('#messageText').keypress(function (e) {
		if (e.which == 13) {
			$.apiRequest($('#messageText').val());
			$('#messageText').val('');
			$('#loadingImg').show();
			$('.micImg').fadeOut();
		}
	});

	$.debug = function(message, type) {
		type = type || 'DEBUG';
		if ($.voiceDebug) console.log('[' + type + '] ' + message);
	};
});