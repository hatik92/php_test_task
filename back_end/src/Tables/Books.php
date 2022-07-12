<?php

namespace Src\Tables;

class Books
{

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getAvailable($result)
    {
        $available = "SELECT book_id, COUNT(*) AS count FROM book_student GROUP BY book_id";
        $available = $this->db->query($available);

        $resultAvailable = $available->fetchAll(\PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($result); $i++) {
            $id = (int)$result[$i]['id'];
            $result[$i]['students'] = $this->db
                ->query("SELECT * FROM students WHERE id IN (SELECT student_id FROM book_student WHERE book_id = $id)")
                ->fetchAll(\PDO::FETCH_ASSOC);
            $result[$i]['available'] = $result[$i]['count'];
            for ($j = 0; $j < count($resultAvailable); $j++) {
                if ($result[$i]['id'] == $resultAvailable[$j]['book_id']) {
                    $result[$i]['available'] = $result[$i]['count'] - $resultAvailable[$j]['count'];
                }
            }
        }
        return $result;
    }

    public function allBooks()
    {
        $books = "SELECT * FROM books";
        try {
            $books = $this->db->query($books);
            $result = $books->fetchAll(\PDO::FETCH_ASSOC);
            $result = $this->getAvailable($result);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function book($id)
    {
        
        $book = "SELECT * FROM books WHERE id = $id";
        try {
            $book = $this->db->query($book);
            $result = $book->fetchAll(\PDO::FETCH_ASSOC);
            $result = $this->getAvailable($result);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find($search)
    {
        $statement = "SELECT * FROM books WHERE title LIKE '%$search%' OR author LIKE '%$search%'";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($search));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $result = $this->getAvailable($result);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function insert(array $input)
    {
        $statement = "
            INSERT INTO book_student 
                (book_id, student_id)
            VALUES
                (:bookId, :studentId);
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'bookId' => $input['bookId'],
                'studentId'  => $input['studentId'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function delete(array $input)
    {
        $statement = "
            DELETE FROM book_student
            WHERE book_id = :bookId AND student_id = :studentId;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array(
                'bookId' => $input['bookId'],
                'studentId'  => $input['studentId'],
            ));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}