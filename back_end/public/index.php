<?php

use Src\Controller\BookController;
use Src\Controller\StudentController;

require "../connection.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$uri = parse_url($_SERVER['REQUEST_URI']);
// $uri = explode('/', $uri);
$query = explode('=', $query);
$query[0] = explode('-', $query[0]);
// print_r($query[0][1]);die;
// all of our endpoints start with /person
// everything else results in a 404 Not Found
// if ($uri[1] !== 'back_end') {
//     header("HTTP/1.1 404 Not Found");
//     exit();
// }

$requestMethod = $_SERVER["REQUEST_METHOD"];

// if ($requestMethod == "GET") {
//     foreach ($_GET as $key => $value) {
//         switch ($key) {
//             case 'books':
//                 $controller = new BookController($dbConnection, $requestMethod);
//                 break;
//             case 'searchBook':
//                 $searchBook = $_GET['searchBook'];
//                 $controller = new BookController($dbConnection, $requestMethod, $searchBook);
//                 break;
//             case 'book':
//                 $searchBook = $_GET['book'];
//                 $controller = new BookController($dbConnection, $requestMethod, $searchBook);
//                 break;
//             case 'students':
//                 $controller = new StudentController($dbConnection, $requestMethod);
//                 break;
//             case 'searchStudent':
//                 $searchStudent = $_GET['searchStudent'];
//                 $controller = new StudentController($dbConnection, $requestMethod, $searchStudent);
//                 break;
//             default:
//                 echo 'Some other message';
//                 break;
//         }
//     }
// } else {
//     $controller = new BookController($dbConnection, $requestMethod);
// }

$param = null;
$rout = null;
if (isset($query[0][1])) {
    $rout = $query[0][1];
}
if (isset($query[1])) {
    $param = $query[1];
}
switch ($query[0][0]) {
    case 'books':
        $controller = new BookController($dbConnection, $requestMethod, $rout, $param);
        $controller->processRequest();
        break;
    case 'students':
        $controller = new StudentController($dbConnection, $requestMethod, $rout, $param);
        $controller->processRequest();
        break;
    default:
        echo 'Some other message';
        break;
}

// pass the request method and user ID to the PersonController and process the HTTP request:
