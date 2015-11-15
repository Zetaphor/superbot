<?php
require 'lib/rotton_tomatoes.php';
$entities = json_decode($_REQUEST['data'], true);

$find_actors = false;
$find_release = false;
$movie_title = $entities['movie_title'][0]['value'];

if (isset($entities['movie_release_date'])) {
	$release = getRelease($movie_title);
	if ($release) echo ucwords($movie_title)  .' was released in '. $release;
	else echo 'Sorry, I was unable to find a movie called '. ucwords($movie_title);
} elseif (isset($entities['movie_actors'])) {
	$actors = getCast($movie_title);
	if ($actors) {
		$actors[(count($actors) -1)] = 'and '. $actors[(count($actors) - 1)];
		echo ucwords($movie_title) ." starred ". implode(', ', $actors);
	} else echo 'Sorry, I was unable to find a movie called '. ucwords($movie_title);
} elseif (isset($entities['movie_poster'])) {
    $poster = getPoster($movie_title);
    if ($poster) $poster;
    else echo 'Sorry, I was unable to find a movie called '. ucwords($movie_title);
}