<?php
namespace Src\Controller;

use Src\Tables\Students;

class StudentController {

    private $db;
    private $requestMethod;
    private $searchStudent;


    public function __construct($db, $requestMethod, $searchStudent = null)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->student = new Students($db);
        $this->searchStudent = $searchStudent;
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->searchStudent) {
                    $response = $this->getSearch($this->searchStudent);
                } else {
                    $response = $this->getAllStudents();
                };
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
        if (! $result) {
            print_r($this->notFoundResponse());
            die;
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