<?php
require 'vendor/autoload.php';

$DEVELOPER_KEY = 'AIzaSyBva-4B3GnpLrYtW5HLvArVEHJxaRkavCI';

$client = new Google_Client();
$client->setDeveloperKey($DEVELOPER_KEY);
// Define an object that will be used to make all API requests.
$youtube = new Google_Service_YouTube($client);

function getVideoId($keyword) {
    global $youtube;
    $searchResponse = $youtube->search->listSearch('id,snippet', array(
        'type' => 'video',
        'fields' => 'items',
        'q' => $keyword,
        'maxResults' => 1,
    ));

    return $searchResponse['modelData']['items'][0]['id']['videoId'];
}