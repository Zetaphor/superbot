<?php
require 'lib/yql_weather.php';
$entities = [];
if (isset($_REQUEST['entities'])) $entities = json_decode($_REQUEST['data'], true);

function getLocalTemp() {
	global $default_location;
	$weather = getTemp($default_location);
	return "The temperature is ". $weather['temp'] ." degrees. The condition is ". $weather['condition'];
}

function getLocationTemp($location) {
	$weather = getTemp($location);
	return "The temperature in ". $weather['city'] .", ". $weather['state'] ." is ". $weather['temp']. " degrees. The condition is ". $weather['condition'];
}

if (count($entities)) {
	// Wit.ai has a problem with realizing that 'outside' is not a location
	if ($entities['location'][0]['value'] == "outside") echo getLocalTemp();
	else echo getLocationTemp($entities['location'][0]['value']);
} else echo getLocalTemp();
