<?php
$db = new mysqli("localhost", "root", "", "books");
$db->set_charset("UTF8");
$book = $db->query("SELECT * FROM books")->fetch_all(true);

if(isset($_GET['book']))
{
    $get = $_GET['book'];
    $books = json_encode($book);
    print $books;
}


if(isset($_GET['search']))
{
    $get = $_GET['search'];
    
    $books = json_encode($db->query("SELECT * FROM books WHERE title='$get' OR author='$get'")->fetch_all(true));
    print $books;
}
?>