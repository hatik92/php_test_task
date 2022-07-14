import { bookStudent } from "./functions.js";

const bookAbout = (book, studentsBook) => {
  return '<h3>Book: ' + book.title.toUpperCase() + '</h3>' +
    '<p>Author: ' + book.author + '</p>' +
    '<p>Year: ' + book.year + '</p>' +
    `<p>Available count: <span id="availableCount${book.id}"> ${book.available}</span></p>` +
    '<div class="d-flex justify-content-between">' +
    '<h3>students who took the book</h3>' +
    `<button class="btn btn-primary" id="assignBook" data-id="${book.id}">+ Assign</button>` +
    '</div>' +
    `<ul class="list-group" id="bookObout${book.id}">` + (studentsBook ? studentsBook : '<p>no one took</p>') + '</ul>'
}

const params = window.location.search
const urlParams = new URLSearchParams(params);
const bookId = urlParams.get('book')
console.log(+bookId);
const bookView = document.getElementById('bookView')
fetch('http://books-task-api.test/books/' + bookId)
  .then(res => {
    return res.clone().json();
  })
  .then(book => {
    console.log(book);
    let studentsBook = ''
    let students = book.students
    if (students.length > 0) {
      for (let i = 0; i < students.length; i++) {
        studentsBook += bookStudent(students[i]);
      }
    }
    bookView.innerHTML = bookAbout(book, studentsBook)
    document.getElementById('assignBook').addEventListener('click', el => {
      fetch('http://books-task-api.test/students/?bookAsign=' + book.id)
        .then(res => console.log(res))
      Swal.fire({
        title: 'Assigned books',
        text: 'allbooks',
        // html: bookListTable,
        // customClass: 'swal-height'
      })
    })
  })