<?php
	function yqlRequest($query) {
		$query = rawurlencode($query);
		$query = "https://query.yahooapis.com/v1/public/yql?q=". $query ."&format=json&callback=";
		$yql_result = json_decode(file_get_contents($query));
		return $yql_result->query->results->channel;
	}

	function getStringBetween($string, $start, $end){
	    $string = " ".$string;
	    $ini = strpos($string,$start);
	    if ($ini == 0) return "";
	    $ini += strlen($start);
	    $len = strpos($string,$end,$ini) - $ini;
	    return substr($string,$ini,$len);
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

	function getForecast($location) {
		$query = 'select item.condition.temp, item.condition.text, location.city, location.region, item.description from weather.forecast where woeid in (select woeid from geo.places(1) where text="'.$location.'")';
		$result = yqlRequest($query);
		return array(
			'condition' => $result->item->condition->text,
			'forecast' => getStringBetween($result->item->description, 'Conditions:</b>', '<a href="'),
			'condition_image' => getStringBetween($result->item->description, 'src="', '.gif') . '.gif'
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

	getForecast('49548');
?>