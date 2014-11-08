$(document).ready(function() {
	var speechQueue = {};

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

	$.sayMessage = function(message) {
		console.log("Saying: " + message);
		var textSynthesis = new SpeechSynthesisUtterance(message);
		window.speechSynthesis.speak(textSynthesis);
	};

	$.sayProcessing = function() {
		$.sayMessage(procMessages[procMsgIndex]);
		procMsgIndex++;
		if (procMsgIndex === Object.keys(procMessages).length) procMsgIndex = 0;
	};


	$.greetUser = function() {
		$.sayMessage(introMessages[introMsgIndex]);
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