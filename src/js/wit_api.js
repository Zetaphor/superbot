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