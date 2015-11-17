<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

require 'lib/yql_weather.php';
require 'config.php';

$entities = json_decode($_REQUEST['data'], true);

$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

// Wit.ai has a problem with realizing that 'outside' is not a location
if (!isset($entities['location']) || $entities['location'][0]['value'] == "outside") $weather = getForecast($default_location);
else $weather = getForecast($entities['location'][0]['value']);

if (count($weather)) {
    $response['message'] = "The condition is " . $weather['condition'] . ". Here is the current forecast";
    $response['html'] = '<div class=\'forecast-results\'><img src="' . $weather['condition_image'] . '"> ' . $weather['forecast'] . '</div>';
} else $response['success'] = false;

if (!$response['success']) {
    $response['message'] = 'Sorry, there was a problem connecting to the weather service';
    $response['html'] = '';
}

echo json_encode($response);
