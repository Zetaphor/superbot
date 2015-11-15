<?php

require 'config.php';

$entities = json_decode($_REQUEST['data'], true);

$name = $entities['person_name'][0]['value'];
if ($name == "my") $name = "your";


$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

if(isset($birthdays[$name])) {
	$birthday = date("l, F jS", strtotime($birthdays[$name]));
	$response['message'] = ucfirst($name . " birthday is on " . $birthday);
} elseif (isset($birthdays[$name . 's'])) {
	$name .= 's';
	$birthday = date("l, F jS", strtotime($birthdays[$name]));
	$response['message'] = ucfirst($name . " birthday is on " . $birthday);
}
else {
    $response['success'] = false;
    $response['message'] = "Sorry, I don't know ". ucfirst($name) ." birthdate";
}
