<?php
namespace Src\Tables;

class Students {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function allStudents()
    {
        $students = "SELECT * FROM students";

        try {
            $students = $this->db->query($students);
            $result = $students->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find($search)
    {
        $statement = "SELECT * FROM students WHERE `name`LIKE '%$search%' OR surname LIKE '%$search%'";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($search));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function assigned($bookId)
    {

        $students = "SELECT students.id, `name`, surname FROM students LEFT OUTER JOIN book_student ON students.id = student_id AND book_id = $bookId WHERE book_id is NULL";
        
        try {
            $students = $this->db->query($students);
            $result = $students->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
        
    }
}