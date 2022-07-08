<?php

namespace Src\Controller;

use Src\Tables\Books;

class BookController
{

    private $db;
    private $requestMethod;
    private $searchBook;

    public function __construct($db, $requestMethod, $searchBook = null)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->book = new Books($db);
        $this->searchBook = $searchBook;
    }

    public function processRequest()
    {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->searchBook && $this->searchBook != '') {
                    $response = $this->getSearch($this->searchBook);
                } else {
                    $response = $this->getAllBooks();
                };
                break;
            case 'POST':
                $response = $this->createAsignFromRequest();
                break;
            case 'DELETE':
                $response = $this->unssingBook();
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

    private function createAsignFromRequest()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateAssign($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->book->insert($input);
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = null;
        return $response;
    }

    private function unssingBook()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        if (!$this->validateAssign($input)) {
            return $this->unprocessableEntityResponse();
        }
        $this->book->delete($input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = null;
        return $response;
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
