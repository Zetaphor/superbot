<?php

require 'kint/Kint.class.php';
require 'lib/yql_weather.php';
require 'config.php';

$entities = json_decode($_REQUEST['data'], true);

?>