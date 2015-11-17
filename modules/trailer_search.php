<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
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
    $response['message'] = "Here is the official trailer for " . $entities['trailer_name'][0]['value'];
    $response['html'] = '<iframe class="video-result" width="560" height="315" src="https://www.youtube.com/embed/' . $video_id. '" frameborder="0" allowfullscreen></iframe>';
}

echo json_encode($response);