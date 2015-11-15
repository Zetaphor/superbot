$(document).ready(function() {
	$.debugStates = {
		debugControls: true,
		debug: true,
		speechDebug: true,
		recognitionDebug: true,
		witDebug: true,
		showTranscript: false,
		showTextInput: false,
		showResponse: false,
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
// https://gist.github.com/woollsta/2d146f13878a301b36d7#file-chunkify-js
// https://stackoverflow.com/questions/21947730/chrome-speech-synthesis-with-longer-texts/23808155#23808155
$(document).ready(function() {
	// The queue of messages waiting to be sent to the tts synthesis
	var speechQueue = [];
	var currentlySpeaking = false;

	var introMsgIndex = 0;
	var introMessages = {
		0: "Hello, how can I be of assistance?",
		1: "Hello again, how can I be of assistance?",
		2: "Hi there, how can I be of assistance?",
		3: "How can I be of assistance?",
		4: "Hello, what can I do for you?",
		5: "Hello again, what can I do for you?",
		6: "Hi there, what can I do for you?",
		7: "What can I do for you?",
		8: "Hello, how can I help you?",
		9: "Hello again, how can I help you?",
		10: "Hi there, how can I help you?",
		11: "How can I help you?",
	};

	var procMsgIndex = 0;
	var procMessages = {
		0: "Give me a moment to look that up for you",
		1: "Give me a moment to find that for you",
		2: "Sure thing, give me a moment to find that for you",
		3: "No problem, please wait while I check that for you",
		4: "Got it, give me a moment to look that up",
		5: "I'll have that information for you in just a moment",
		6: "Give me a moment to look that up",
		7: "That will take just a moment to look up",
		8: "Got it, give me a moment to find that"
	};

	// Runs on an interval, speaking the next message in the queue
	$.processSpeechQueue = function() {
		// $.debug("Speech Queue: " + speechQueue, 'SPEECH');
		if (speechQueue.length > 0) {
			if (currentlySpeaking === false) {
				var msg = new SpeechSynthesisUtterance(speechQueue[0]);
                msg.lang = 'en-GB';
				console.log(msg); // Chrome bug workaround
				speechSynthesis.cancel(); // Chrome bug workaround
				console.log(msg); // Chrome bug workaround
				speechSynthesis.speak(msg);
				$.debug("Issued speech command", 'SPEECH');
				msg.onstart = function(event) {
					$.debug('Start', 'SPEECH');
					currentlySpeaking = true;
				};

				msg.onend = function(event) {
					speechSynthesis.cancel(); // Chrome bug workaround
					speechQueue.shift();
					currentlySpeaking = false;
					$('.loadingImg').fadeOut(function() {
						$('.micStandard').fadeIn();
					});
					$.debug("End", 'SPEECH');
				};
			}
		}
	};

	// Push a new message onto the speech queue
	$.sayMessage = function(message) {
		$.debug("Queued message: "+message, 'SPEECH');
		speechQueue.push(message);
	};

	$.lowConfidence = function() {
		$.sayMessage("I'm not sure I understood that, could you please rephrase the question?");
	};

	// Choose a random processing message
	$.sayProcessing = function() {
		$.sayMessage(procMessages[procMsgIndex]);
		procMsgIndex++;
		if (procMsgIndex === Object.keys(procMessages).length) procMsgIndex = 0;
	};


	$.greetUser = function() {
		// Push the greeting onto the queue and call it manually
		speechQueue.push(introMessages[introMsgIndex]);
		$.processSpeechQueue();

		// Start the speech queue processing
		setInterval("$.processSpeechQueue()", 1000);
	};

	function randomNumber(max) {
		return Math.floor(Math.random() * (Math.floor(max/2) + Math.floor(max/2)) );
	}

	// Choose a random intro and initial processing message
	introMsgIndex = randomNumber(Object.keys(introMessages).length);
	procMsgIndex = randomNumber(Object.keys(procMessages).length);
	$.debug('Intro Index: '+introMsgIndex);
	$.debug('Proccessing Index: '+procMsgIndex);

	$.greetUser();

	// $('.speechDing')[0].play();
	// $('.speechDing').trigger("play");
});
$(document).ready(function() {
	$.apiRequest = function(message) {
		$.debug('Sending message: '+message, 'WIT-API');
		$.ajax({
			url: 'https://api.wit.ai/message',
			data: {
				'q': message,
				'access_token' : 'JTLAYL74TLLX6CQJ433IOQALQPLUEPGP'
			},
			dataType: 'jsonp',
			method: 'GET',
			success: function(response) {
				var command = response.outcomes[0].intent;
				var entities = response.outcomes[0].entities;
				var confidence = response.outcomes[0].confidence;
				var message = response._text;
				$.debug("Message: "+ message, 'WIT-API');
				$.debug("Command: "+ command, 'WIT-API');
				$.debug("Confidence: "+ confidence, 'WIT-API');
				$.debug("---- Entities ----", 'WIT-API');
				console.log(entities);
				// $.debug(JSON.stringify(entities));

                if (command == 'UNKNOWN') {
                    $.sayMessage("Sorry, I don't yet recognize that command");
                } else {
                    if (confidence < 0.5) {
                        $.debug("Low confidence: " + confidence, 'WIT-API');
                        $.lowConfidence();
                    } else {
                        $.post( "/modules/" + command + ".php", { data: JSON.stringify(entities) })
                            .done(function( data ) {
                                if ($.debugStates.showResponse) $('#response').html(data);
                                $.debug("Data returned: " + data, 'MODULE');
                                if (data.length) $.sayMessage(data);
                                else $.sayMessage('Sorry, I encountered an error while looking that up');
                            })
                            .error(function() {
                                $.sayMessage("Sorry, I'm having trouble with that part of my programming");
                            });
                    }
                }
			}
		});
	};
});