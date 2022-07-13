<?php

namespace Src\Controller;

use Src\Tables\Books;

class BookController
{

    private $db;
    private $requestMethod;
    private $param;

    public function __construct($db, $requestMethod, $rout, $param = null)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->book = new Books($db);
        $this->param = $param;
        $this->rout = $rout;
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                switch ($this->rout) {
                    case 'allBooks':
                        $response = $this->getAllBooks();
                        break;
                    case 'searchBook':
                        if ($this->param != '') {
                            $response = $this->getSearch($this->param);
                        } else {
                            $response = $this->getAllBooks();
                        };
                        break;
                    case 'book':
                        $response = $this->getBook($this->param);
                        break;
                    case 'takingBooks':
                        $response = $this->getTakingBooks($this->param);
                        break;
                    case 'delete':
                        $response = $this->unssingBook($this->param);
                        break;
                    default:
                        $response = $this->notFoundResponse();
                        break;
                }
                break;
                // if (is_numeric($this->param)) {
                //     $response = $this->getBook($this->param);
                //     break;
                // }
                // if ($this->param && $this->param != '') {
                //     $response = $this->getSearch($this->param);
                // } else {
                //     $response = $this->getAllBooks();
                // };
                // break;
            case 'POST':
                $response = $this->createAsignFromRequest();
                break;
            case 'DELETE':
                $response = $this->unssingBook($this->param);
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

    private function getAllBooks()
    {
        $result = $this->book->allBooks();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getBook($id)
    {
        $result = $this->book->book($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getSearch($search)
    {
        $result = $this->book->find($search);
        if (!$result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getTakingBooks($id) {
        $result = $this->book->takingBooks($id);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function createAsignFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateAssign($input)) {
            return $this->unprocessableEntityResponse();
        }
        // var_dump(!!$this->book->insert($input));die;
        // $this->book->insert($input);
        if (!!$this->book->insert($input)) {
            $response['status_code_header'] = 'HTTP/1.1 201 Created';
            $response['body'] = null;
            var_dump('This book has been added successfully');
            return $response;
        } else {
            $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
            $response['body'] = null;
            var_dump('Something went wrong!');
            return $response;
        }
    }

    private function unssingBook($id)
    {
        // $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        // if (!$this->validateAssign($input)) {
        //     return $this->unprocessableEntityResponse();
        // }

        if (!!$this->book->delete($id)) {
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
            $response['body'] = null;
            var_dump('This book has been successfully deleted');
            return $response;
        } else {
            $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
            $response['body'] = null;
            var_dump('Something went wrong!');
            return $response;
        }
    }

    private function validateAssign($input)
    {
        if (!isset($input['bookId'])) {
            return false;
        }
        if (!isset($input['studentId'])) {
            return false;
        }
        return true;
    }

    private function unprocessableEntityResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function notFoundResponse()
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}
