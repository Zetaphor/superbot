<?php
require 'kint/Kint.class.php';
require 'lib/yql_weather.php';
require 'config.php';

$entities = json_decode($_REQUEST['data'], true);

function getLocalTemp() {
	global $default_location;
	$weather = getTemp($default_location);
	return "The temperature is ". $weather['temp'] ." degrees. The condition is ". $weather['condition'];
}

function getLocationTemp($location) {
	$weather = getTemp();
	return "The temperature in ". $weather['city'] .", ". $weather['state'] ." is ". $weather['temp']. " degrees. The condition is ". $weather['condition'];
}

if (count($entities)) {
	// Wit.ai has a problem with realizing that 'outside' is not a location
	if ($entities['location'][0]['value'] == "outside") echo getLocalTemp();
	else echo getLocationTemp();
} else echo getLocalTemp();

?>