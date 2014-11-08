<?php
require 'kint/Kint.class.php';
require 'lib/yql_weather.php';
require 'config.php';

$entities = json_decode($_REQUEST['data'], true);

if (count($entities)) {
	$weather = getTemp($entities['location'][0]['value']);
	echo "The temperature in ". $weather['city'] .", ". $weather['state'] ." is ". $weather['temp']. " degrees. The condition is ". $weather['condition'];
} else {
	$weather = getTemp($default_location);
	echo "The temperature is ". $weather['temp'] ." degrees. The condition is ". $weather['condition'];
}

?>