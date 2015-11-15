<?php
require 'lib/rotton_tomatoes.php';
require '../kint/Kint.class.php';

$entities = json_decode($_REQUEST['data'], true);

$find_actors = false;
$find_release = false;
$movie_title = $entities['movie_title'][0]['value'];

$response = [
    'success' => true,
    'message' => '',
    'html' => ''
];

$found_title = true;
if (isset($entities['movie_release_date'])) {
	$release = getRelease($movie_title);
	if ($release) $response['message'] = ucwords($movie_title)  .' was released in '. $release;
	else $found_title = false;
} elseif (isset($entities['movie_actors'])) {
	$actors = getCast($movie_title);
	if ($actors) {
		$actors[(count($actors) -1)] = 'and '. $actors[(count($actors) - 1)];
		$response['message'] = ucwords($movie_title) ." starred ". implode(', ', $actors);
	} else $found_title = false;
} elseif (isset($entities['movie_poster'])) {
    $poster = getPoster($movie_title);
    if ($poster) {
        if (strpos($poster, '54x81')) {
            $poster = explode('54x81', $poster);
            $poster = 'http:/' . $poster[1];
        } else if (strpos($poster, '54x80')) {
            $poster = explode('54x80', $poster);
            $poster = 'http:/' . $poster[1];
        }
        $response['message'] = "Here's the poster for the movie " . $movie_title;
        $response['html'] = '<img class="poster-image" src="' . $poster . '">';
    }
    else $found_title = false;
}

if (!$found_title) $response['message'] = 'Sorry, I was unable to find a movie called '. ucwords($movie_title);

echo json_encode($response);

//