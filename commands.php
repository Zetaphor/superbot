<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 'On');
require 'kint/Kint.class.php';

if (isset($_REQUEST['command'])) {
    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL, "http://$_SERVER[SERVER_NAME]/modules/" . $_REQUEST['command'] . '.php');
    curl_setopt($ch,CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_FAILONERROR, false);
    curl_setopt($ch,CURLOPT_POSTFIELDS, 'data=' . $_REQUEST['data']);

    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode == 404) {
        $response = [
            'success' => false,
            'message' => "Sorry, I'm having trouble with that part of my programming"
        ];
        echo json_encode($response);
    }

    curl_close($ch);
} else {
    echo 'Missing params';
}