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
                        $.post( "/commands.php", { command: command, data: JSON.stringify(entities) })
                            .done(function( data ) {
                                var success = true;
                                var message = '';
                                var html = '';
                                if (data.length) {
                                    var reply = JSON.parse(data);
                                    if (reply.success) {
                                        message = reply.message;
                                        html = reply.html;
                                    } else success = false;
                                } else success = false;

                                if (success) {
                                    if (message.length) $.sayMessage(message);
                                    if (html.length) $('.htmlOutput').html(html);
                                    if ($.debugStates.showResponse) $('#response').html(message);
                                } else $.sayMessage('Sorry, I encountered an error while looking that up');
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