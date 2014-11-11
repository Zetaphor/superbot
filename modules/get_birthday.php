<?php

$birthdays = array(
	'your' => '04/19',
	'jessicas' => '3/08'
);

$entities = json_decode($_REQUEST['data'], true);

$name = $entities['person_name'][0]['value'];
if ($name == "my") $name = "your";


if(isset($birthdays[$name])) {
	$birthday = date("l, F jS", strtotime($birthdays[$name]));
	echo ucfirst($name . " birthday is on " . $birthday);
} elseif (isset($birthdays[$name . 's'])) {
	$name .= 's';
	$birthday = date("l, F jS", strtotime($birthdays[$name]));
	echo ucfirst($name . " birthday is on " . $birthday);
}
else echo "Sorry, I don't know ". ucfirst($name) ." birthdate";

?>