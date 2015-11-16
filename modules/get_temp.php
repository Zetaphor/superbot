<?php
require 'config.php';
require 'lib/yql_weather.php';
$entities = [];
if (isset($_REQUEST['entities'])) $entities = json_decode($_REQUEST['data'], true);

function getLocalTemp() {
	global $default_location;
	$weather = getTemp($default_location);
    if (count($weather)) return "The temperature is ". $weather['temp'] ." degrees. The condition is ". $weather['condition'];
    else return false;
}

function getLocationTemp($location) {
	$weather = getTemp($location);
    if (count($weather)) {
        return "The temperature in ". $weather['city'] .", ". $weather['state'] ." is ". $weather['temp']. " degrees. The condition is ". $weather['condition'];
    } else return false;
}

$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

$weather_response = '';
if (count($entities)) {
	// Wit.ai has a problem with realizing that 'outside' is not a location
	if ($entities['location'][0]['value'] == "outside") $weather_response = getLocalTemp();
	else $weather_response = getLocationTemp($entities['location'][0]['value']);
} else $weather_response = getLocalTemp();

if (!$weather_response) {
    $response['success'] = false;
    $response['message'] = 'Sorry, there was a problem connecting to the weather service';
} else $response['message'] = $weather_response;


echo json_encode($response);
