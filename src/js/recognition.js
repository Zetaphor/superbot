$(document).ready(function() {
	var finalTranscript = '';
	var recognizing = false;

	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;         // keep processing input until stopped
	recognition.interimResults = true;     // show interim results
	recognition.lang = 'en-US';           // specify the language

	recognition.onstart = function() {
		recognizing = true;
		$.debug("Recognition started", 'RECOGNITION');
        $('.micAnimated').show();
	};

	recognition.onerror = function(event) {
		$.debug('Recognition error', 'RECOGNITION');
        $('.errorDing')[0].play();
		$.sayMessage("Sorry, I encountered an error while listening");
	};

	recognition.onend = function() {
		recognizing = false;
        $('.micAnimated').hide();
		$.debug("Recognition ended", 'RECOGNITION');
        $('.speechDing')[0].play();
		if (finalTranscript.length) {
			// $.sayProcessing();
			$.apiRequest(finalTranscript);
            $('.loadingImg').show();
            $('.micImg').fadeOut();
		} else {
            $('.errorDing')[0].play();
			$.sayMessage("Sorry, I didn't catch that. Could you please try again?");
		}
	};

    recognition.onresult = function(event) {
        var interimTranscript = '';

        // Assemble the transcript from the array of results
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        $('.transcript').html(interimTranscript);

        $.debug("interim:  " + interimTranscript, 'RECOGNITION');
        $.debug("final:    " + finalTranscript, 'RECOGNITION');

        // Update the page
        if(finalTranscript.length > 0) {
            $('.transcript').html(finalTranscript);
            recognition.stop();
            recognizing = false;
        }
    };

    $(".micImg").click(function(e) {
        e.preventDefault();

        if (recognizing) {
            recognition.stop();
            recognizing = false;
        } else {
            finalTranscript = '';
            // Request access to the User's microphone and Start recognizing voice input
            recognition.start();
            $('.transcript').html('');
        }
    });

});