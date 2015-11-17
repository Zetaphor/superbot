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


if (isset($entities['video_subject'][0]['value'])) {
    $video_id = getVideoId($entities['video_subject'][0]['value']);
    $response['message'] = "Here's the video you requested";
    $response['html'] = '<iframe class="video-result" width="560" height="315" src="https://www.youtube.com/embed/' . $video_id. '" frameborder="0" allowfullscreen></iframe>';
}

echo json_encode($response);