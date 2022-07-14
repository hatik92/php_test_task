<?php

use Src\Controller\BookController;
use Src\Controller\StudentController;

require "../connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Accept");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
header("Content-Type: text/html; application/json; charset=UTF-8");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
// print_r($uri);die;
$id = null;
if (isset($uri[2])) {
    $id = (int) $uri[2];
}

$requestMethod = $_SERVER["REQUEST_METHOD"];

switch ($uri[1]) {
    case 'books':
        $controller = new BookController($dbConnection, $requestMethod, $id);
        break;
    case 'students':
        $controller = new StudentController($dbConnection, $requestMethod, $id);
        break;
    default:
        header("HTTP/1.1 404 Not Found");
        exit();
        break;
}

$controller->processRequest();