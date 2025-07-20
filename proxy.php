<?php

$apiUrl = 'https://api-core.kuchyneoresi.eu/partners_api2/api/v2/WebSales';
$apiKey = '39498757-0426-4A99-919C-3265414E53F7';

$data = file_get_contents('php://input');

$ch = curl_init($apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'APIKey: ' . $apiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
header('Content-Type: application/json');
echo $response;
