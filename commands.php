<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
require 'kint/Kint.class.php';

if (isset($_REQUEST['command'])) {
    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL, "http://$_SERVER[SERVER_NAME]/modules/" . $_REQUEST['command'] . '.php');
    curl_setopt($ch,CURLOPT_POST, count(1));
    curl_setopt($ch,CURLOPT_POSTFIELDS, 'data=' . $_REQUEST['data']);

    $result = curl_exec($ch);

    curl_close($ch);


} else {
    echo 'Missing params';
}