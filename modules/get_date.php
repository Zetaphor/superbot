<?php

$entities = json_decode($_REQUEST['data'], true);
if (count($entities)) {
	if (isset($entities['datetime']['value'])) {
		$datetime = strtotime($entities['datetime']['value']['from']);
	} else if (isset($entities['datetime'][0]['value'])) {
		$datetime = strtotime($entities['datetime'][0]['value']);
	}
	echo "That day is ". date("l, F jS", $datetime);
} else {
	echo "Today's date is " . date("l, F jS", getDate()[0]);
}

?>