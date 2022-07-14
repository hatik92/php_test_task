<?php

namespace Src\Controller;

use Src\Tables\Students;

class StudentController
{

    private $db;
    private $requestMethod;
    private $searchStudent;


    public function __construct($db, $requestMethod, $id = null)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->student = new Students($db);
        $this->id = $id;
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if (isset($_GET['searchStudent']) && $_GET['searchStudent'] != '') {
                    $response = $this->getSearch($_GET['searchStudent']);
                } else {
                    $response = $this->getAllStudents();
                }
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        header($response['status_code_header']);
        if ($response['body']) {
            print $response['body'];
        }
    }

    private function getAllStudents()
    {
        $result = $this->student->allStudents();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getSearch($search)
    {
        $result = $this->student->find($search);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 404;
        $response['body'] = null;
        return json_encode($response);
    }
}
