$(document).ready(function() {
	var debug = true;
	var speechDebug = true;
	var recognitionDebug = true;
	var witDebug = true;

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
		var outputDebug = false;
		switch(type) {
			case "SPEECH":
				if (speechDebug) outputDebug = true;
				break;
			case "WIT-API":
				if (witDebug) outputDebug = true;
				break;
			case "RECOGNITION":
				if (recognitionDebug) outputDebug = true;
				break;
			default:
				if (debug) outputDebug = true;
				break;
		}

		if (outputDebug) console.log('[' + type + '] ' + message);
	};
});