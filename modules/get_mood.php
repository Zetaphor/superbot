<?php
$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

$moods = array(
		"I'm doing well, thanks for asking!",
		"I'm great!",
		"I'm doing just fine",
		"I am operating at peak efficiency",
		"I'm doing good",
		"I'm doing great, thanks for asking!",
		"I'm doing just fine, thank you for asking",
		"I am doing well",
		"I am well"
	);

$moodIndex = floor(rand(0, count($moods)) / 2) + floor(rand(0, count($moods)) / 2);
$response['message'] = $moods[$moodIndex];
echo json_encode($response);