import { fetchRequset, searchStudent, url } from "./functions.js";

const searchStudents = document.getElementById('bookAssign')
const params = window.location.search
const urlParams = new URLSearchParams(params);
const bookId = urlParams.get('book')
const bookView = document.getElementById('bookView')
const loader = document.createElement('div')
loader.classList.add("loader");

const bookAbout = (book, studentsBook) => {
  return '<h3>Book: ' + book.title.toUpperCase() + '</h3>' +
    '<p>Author: ' + book.author + '</p>' +
    '<p>Year: ' + book.year + '</p>' +
    `<p>Available count: <span id="availableCount${book.id}"> ${book.available}</span></p>` +
    '<div class="d-flex justify-content-between">' +
    '<h3>students who took the book</h3>' +
    `<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="assignBook" data-id="${book.id}">+ Assign</button>` +
    '</div>' +
    '<div>' +
    `<ul class="list-group" id="bookObout${book.id}">` + (studentsBook ? studentsBook : '<p>no one took</p>') +
    '</ul>' +
    '</div>'
}

const bookStudent = (student) => {
  return `<li ` +
    `class="list-group-item d-flex justify-content-between"` +
    `align-items-center" id="unassign${student.id}">` +
    `Name: ${student.surname}` +
    `<button class='btn btn-danger' id="unassignBook${student.id}" data-id="${student.id}">Unassign` +
    `</button>` +
    `</li>`;
}

const bookStudentAppend = (student) => {
  const studentLiElem = document.createElement('li')
  const unassignButton = document.createElement('button')
  studentLiElem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
  studentLiElem.setAttribute('id', `unassign${student.id}`)
  studentLiElem.innerHTML = `Name: ${student.surname}`
  unassignButton.classList.add('btn', 'btn-danger')
  unassignButton.setAttribute('id', `unassignBook${student.id}`)
  unassignButton.setAttribute('data-id', student.id)
  unassignButton.innerHTML = 'Unassign'
  studentLiElem.append(unassignButton)
  return studentLiElem
}
const studentView = (student) => {
  return `<li ` +
    `class="list-group-item d-flex justify-content-between"` +
    `align-items-center" id="assign${student.id}">` +
    `${student.surname}` +
    `<button class='btn btn-success' id="assignBookToStudent${student.id}" data-id="${student.id}">Assign` +
    `</button>` +
    `</li>`;
}


fetch('http://books-task-api.test/books/' + bookId)
  .then(res => {
    return res.clone().json();
  })
  .then(book => {
    let studentsBook = ''
    let students = book.students
    if (students.length > 0) {
      for (let i = 0; i < students.length; i++) {
        studentsBook += bookStudent(students[i]);
      }
    }
    
    bookView.innerHTML = bookAbout(book, studentsBook)
    const unassignBookUser = document.querySelectorAll(`[id*="unassignBook"]`)
    unassignBookUser.forEach(el => el.addEventListener('click', event => {
      let studentId = event.target.getAttribute("data-id")
      el.setAttribute("disabled", "");
      el.textContent = '';
      el.appendChild(loader);
      fetch(url + `books`
        , {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bookId, studentId }),
        }
      )
        .then(res => {
          console.log(res);
          if (!res.ok) {
            Swal.fire({
              icon: 'error',
              title: res.statusText,
              text: 'Something went wrong!',
            })
          } else {
            el.parentElement.remove()
            if (document.getElementById('assignedBooksTableBody').innerHTML == '') {
              document.getElementById('assignedBooksBlock').innerHTML = '<h2>No assigned books</h2>'
            }
          }
        })
        .catch(err => console.log(err))
    }))
    const assigbButton = document.querySelector('#assignBook')
    assigbButton.addEventListener('click', el => {

      searchStudents.innerHTML = ''
      fetchRequset('students/?assigned=' + bookId)
        .then(res => res.clone().json())
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            searchStudents.innerHTML += studentView(res[i]);
          }
          const assignBookToStudent = document.querySelectorAll(`[id*="assignBookToStudent"]`);
          assignBookToStudent.forEach(el => el.addEventListener('click', event => {
            let studentId = event.target.getAttribute("data-id")
            fetchRequset('books', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ bookId, studentId }),
            })
              .then(res => {
                console.log(res);
                if (!res.ok) {
                  Swal.fire({
                    icon: 'error',
                    title: res.statusText,
                    text: 'Something went wrong!',
                  })
                } else {
                  let student = students.find(st => st.id = studentId)
                  el.parentElement.remove()
                  document.getElementById(`bookObout${bookId}`).append(bookStudentAppend(student))
                }
              })
              .catch(err => console.log(err))
          }));
        })
        .catch((err) => {
          console.log(err);
          searchStudents.innerHTML = '<h1>Not Found</h1>'
        });
      // }
    })
  })


const searchButton = document.querySelector('#button-addon2')
searchButton.addEventListener('click', el => {

  let searchValue = document.getElementById('searchValue').value
  console.log(searchValue)
  searchStudents.innerHTML = ''
  if (searchValue !== '') {
    searchStudent(searchValue)
      .then(res => {
        if (!res.ok) throw new Error("Status code error :" + res.status)
        return res.json();
      })
      .then(res => {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            searchStudents.innerHTML += studentView(res[i]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        searchStudents.innerHTML = '<h1>Not Found</h1>'
      });
  }
})