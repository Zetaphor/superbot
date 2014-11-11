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
				// $.debug(entities);
				// $.debug(JSON.stringify(entities));
				$.post( "modules/" + command + ".php", { data: JSON.stringify(entities) })
					.done(function( data ) {
						$.debug("Data returned: " + data, 'WIT-API');
						$.sayMessage(data);
					});
			}
		});
	};
});