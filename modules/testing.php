<?php
$responses = array(
    "Test worked!",
    "I'm alive!",
    "It work's!",
    "Hello World!",
);

$responseIndex = floor(rand(0, count($responses)) / 2) + floor(rand(0, count($responses)) / 2);
echo $responses[$responseIndex];