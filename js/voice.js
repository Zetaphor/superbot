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
		if (speechQueue.length) {
			if (!currentlySpeaking) {
				var msg = new SpeechSynthesisUtterance(speechQueue[0]);
				window.speechSynthesis.speak(msg);
				currentlySpeaking = true;

				// msg.onstart = function (event) {
					// console.log('Start speech');
				// };

				msg.onend = function(event) {
					speechQueue.splice(0, 1);
					currentlySpeaking = false;
					$('#loadingImg').fadeOut(function() {
						$('#micStandard').fadeIn();
					});
					// console.log("Speech ended");
				};
			}
		}
	};

	// Push a new message onto the speech queue
	$.sayMessage = function(message) {
		speechQueue.push(message);
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
	console.log('Intro Index: '+introMsgIndex);
	console.log('Proccessing Index: '+procMsgIndex);

	$.greetUser();
});