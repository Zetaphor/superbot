<?php
require 'kint/Kint.class.php';

$greetings = array(
		'Hello again!',
		'Nice to see you again!',
		'Greetings!',
		'Good day!',
		'Hello!',
		'Salutations!',
		'Hello! Hope your day is going well!',
		"Greetings, I hope you're having a great day!"
	);

$greetingIndex = floor(rand(0, count($greetings)) / 2) + floor(rand(0, count($greetings)) / 2);
echo $greetings[$greetingIndex];
?>