$(document).ready(function() {
	$.debugStates = {
		debugControls: true,
		debug: true,
		speechDebug: true,
		recognitionDebug: true,
		witDebug: true,
		showTranscript: false,
		showTextInput: false,
		showResponse: false
	};

	$('.submitMessage').click(function() {
		$.apiRequest($('.messageText').val());
		$('.loadingImg').show();
		$('.micImg').fadeOut();
	});

	$('.messageText').keypress(function (e) {
		if (e.which == 13) {
			$.apiRequest($('.messageText').val());
			$('.messageText').val('');
			$('.loadingImg').show();
			$('.micImg').fadeOut();
		}
	});

	$.debug = function(message, type) {
		type = type || 'DEBUG';
		var outputDebug = false;
		switch(type) {
			case "SPEECH":
				if ($.debugStates.speechDebug) outputDebug = true;
				break;
			case "WIT-API":
				if ($.debugStates.witDebug) outputDebug = true;
				break;
			case "MODULE":
				if ($.debugStates.witDebug) outputDebug = true;
				break;
			case "RECOGNITION":
				if ($.debugStates.recognitionDebug) outputDebug = true;
				break;
			default:
				if ($.debugStates.debug) outputDebug = true;
				break;
		}

		if (outputDebug) console.log('[' + type + '] ' + message);
	};

	function updateDebug() {
		if ($.debugStates.showTranscript) $('.transcript').fadeIn();
		else $('.transcript').fadeOut();

		if ($.debugStates.showTextInput) $('.textInput').fadeIn();
		else $('.textInput').fadeOut();

		if ($.debugStates.showResponse) $('.response').fadeIn();
		else $('.response').fadeOut();
	}

	$('.debugSwitch').change(function() {
		var checked = $(this).prop('checked');
		$.debugStates[$(this).attr('name')] = checked;
		updateDebug();
	});

    if ($.debugStates.debugControls) $('.debugControls').show();
	updateDebug();
});