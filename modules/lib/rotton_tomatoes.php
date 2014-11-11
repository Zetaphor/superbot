<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');
require '../kint/Kint.class.php';

$api_key = "u6xsnwvbm4y7tfxy3vtr5tax";

function rottonRequest($query) {
	global $api_key;
	$results = json_decode(file_get_contents('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q='. urlencode($query) .'&page_limit=1&page=1&apikey='. $api_key));
	$movie_result = $results->movies[0];
	$movie = array(
		'poster' => str_replace("_tmb", "_det", $movie_result->posters->profile),
		'release_year' => $movie_result->year,
		'synopsis' => $movie_result->synopsis,
		'audience_rating' => $movie_result->ratings->audience_score,
		'critic_score' => $movie_result->ratings->critics_score,
		'cast' => array()
	);

	foreach($movie_result->abridged_cast as $actor) {
		$movie['cast'][] = $actor->name;
	}

	return $movie;
}

rottonRequest('Beyond the lights');

?>