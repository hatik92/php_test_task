<?php

use Src\Controller\BookController;
use Src\Controller\StudentController;

require "../connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

// all of our endpoints start with /person
// everything else results in a 404 Not Found
if ($uri[1] !== 'back_end') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

$requestMethod = $_SERVER["REQUEST_METHOD"];
$controller;
if ($requestMethod == "GET") {
    foreach ($_GET as $key => $value) {
        switch ($key) {
            case 'books':
                $controller = new BookController($dbConnection, $requestMethod);
                break;
            case 'searchBook':
                $searchBook = $_GET['searchBook'];
                $controller = new BookController($dbConnection, $requestMethod, $searchBook);
                break;
            case 'students':
                $controller = new StudentController($dbConnection, $requestMethod);
                break;
            default:
                echo 'Some other message';
                break;
        }
    }
} else {
    $controller = new BookController($dbConnection, $requestMethod);
}

$controller->processRequest();

// pass the request method and user ID to the PersonController and process the HTTP request:
