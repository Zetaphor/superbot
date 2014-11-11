<?php

$entities = json_decode($_REQUEST['data'], true);

if (count($entities)) {
	$datetime = strtotime($entities['datetime']['value']['from']);
	echo "That day is ". date("l, F jS", $time);
} else {
	echo "Today's date is " . date("l, F jS", getDate()[0]);
}

?>