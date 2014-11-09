<?php
ini_set('display_errors',1);
error_reporting(E_ALL);
require 'kint/Kint.class.php';

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
echo $moods[$moodIndex];
?>