<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
require '../kint/Kint.class.php';
require 'lib/youtube_video.php';

$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

if (isset($_REQUEST['data'])) $entities = json_decode($_REQUEST['data'], true);
else $response['success'] = false;

if (isset($entities['trailer_name'][0]['value'])) {
    $video_id = getVideoId($entities['trailer_name'][0]['value'] . ' official trailer');
    $response['message'] = "Here's the is the trailer for " . $entities['trailer_name'][0]['value'];
    $response['html'] = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' . $video_id. '" frameborder="0" allowfullscreen></iframe>';
}

echo json_encode($response);