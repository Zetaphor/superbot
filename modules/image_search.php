<?php
require '../kint/Kint.class.php';
$entities = json_decode($_REQUEST['data'], true);

$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

if (isset($entities['image_subject'][0]['value'])) {
    $results = json_decode(file_get_contents('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' . $entities['image_subject'][0]['value']));
    if ($results->responseStatus == 200) {
        if (count($results->responseData->results)) {
            $images = [];
            foreach($results->responseData->results as $result) {
                $images[] = '<a href="' . $result->unescapedUrl . '"><img class="image" src="' . $result->unescapedUrl . '"></a>';
            }
            $response['message'] = 'Here are pictures of ' . $entities['image_subject'][0]['value'] ;
            $response['html'] = '<section class="image-results">' . implode(' ', $images) . '</section>';
        } else $response['success'] = false;
    } else $response['success'] = false;
} else $response['success'] = false;

if (!$response['success']) {
    $response['message'] = 'Sorry, there was a problem locating images';
}

echo json_encode($response);