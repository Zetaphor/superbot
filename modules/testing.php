<?php
$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

$responses = array(
    "Test worked!",
    "I'm alive!",
    "It work's!",
    "Hello World!",
);

$responseIndex = floor(rand(0, count($responses)) / 2) + floor(rand(0, count($responses)) / 2);
$response['message'] = $responses[$responseIndex];
echo json_encode($response);