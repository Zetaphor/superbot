<?php

$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

$entities = json_decode($_REQUEST['data'], true);
if (count($entities)) {
	if (isset($entities['datetime']['value'])) {
		$datetime = strtotime($entities['datetime']['value']['from']);
	} else if (isset($entities['datetime'][0]['value'])) {
		$datetime = strtotime($entities['datetime'][0]['value']);
	}
	$response['message'] = "That day is ". date("l, F jS", $datetime);
} else {
	$response['message'] = "Today's date is " . date("l, F jS", getDate()[0]);
}

echo json_encode($response);
