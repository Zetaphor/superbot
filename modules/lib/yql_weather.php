<?php
	function yqlRequest($query) {
		$query = rawurlencode($query);
		$query = "https://query.yahooapis.com/v1/public/yql?q=". $query ."&format=json&callback=";
		$yql_result = json_decode(file_get_contents($query));
		return $yql_result->query->results->channel;
	}

	function getTemp($location) {
		$query = 'select item.condition.temp, item.condition.text, location.city, location.region from weather.forecast where woeid in (select woeid from geo.places(1) where text="'.$location.'")';
		$result = yqlRequest($query);
		return array(
			'city' => $result->location->city,
			'state' => $result->location->region,
			'temp' => $result->item->condition->temp,
			'condition' => $result->item->condition->text
		);
	}
?>