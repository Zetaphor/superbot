<?php
	require '../kint/Kint.class.php';

	function yqlRequest($query) {
		$query = rawurlencode($query);
		$query = "https://query.yahooapis.com/v1/public/yql?q=". $query ."&format=json&callback=";
		$yql_result = json_decode(file_get_contents($query));
		return $yql_result->query->results->channel;
	}

	function getTemp($location) {
		$query = 'select item.condition.temp, item.condition.text, location.city, location.region, item.description from weather.forecast where woeid in (select woeid from geo.places(1) where text="'.$location.'")';
		$result = yqlRequest($query);
		d($result->item->description);
		return array(
			'city' => $result->location->city,
			'state' => $result->location->region,
			'temp' => $result->item->condition->temp,
			'condition' => $result->item->condition->text
		);
	}

	function getWindChill($location) {
		$query = 'select wind.chill from weather.forecast where woeid in (select woeid from geo.places(1) where text="'.$location.'")';
		$result = yqlRequest($query);
		return $result->wind->chill;
	}

	function getWindSpeed($location) {
		$query = 'select wind.speed from weather.forecast where woeid in (select woeid from geo.places(1) where text="'.$location.'")';
		$result = yqlRequest($query);
		return $result->wind->speed;
	}

	getTemp('49548');

?>