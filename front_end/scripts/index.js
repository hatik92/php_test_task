var url = '../back_end/public/index.php';
const bookBody = document.getElementById('bookTableBody')
const studentBody = document.getElementById('studentTableBody')

const tableRowBook = (res) => {
  return `<tr>` +
    `<th scope='row'>${res.id}</th>` +
    `<td>${res.title.toUpperCase()}</td>` +
    `<td>${res.author}</td>` +
    `<td>${res.year}</td>` +
    `<td>${res.count} / ${res.available ? res.available : res.count}</td>` +
    `<td><button class='btn btn-warning' onclick="showBook(${res.id})" >View</button></td>` +
    `</tr>`;
}

const tableRowStudent = (res) => {
  return `<tr>` +
    `<th scope='row'>${res.id}</th>` +
    `<td>${res.name}</td>` +
    `<td>${res.surname}</td>` +
    `<td><button class='btn btn-warning' onclick="bookList(${res.id})">Assign book</button></td>` +
    `</tr>`;
}

const bookStudent = (student, bookId) => {
  return `<p id="unssignBook${bookId}">Name: ${student.surname} <button class='btn btn-warning' onclick="unssingBook(${student.id}, ${bookId})">Unssign</button></p>`;
}

const bookListModal = (book, studentId) => {
  return `<tr>` +
    `<td>${book.title.toUpperCase()}</td>` +
    `<td id="book${book.id}">${book.available ? book.available : book.count}</td>` +
    `<td><button class='btn btn-warning' ${(book.available && book.available - book.count == 0) || book.count == 0 ? 'disabled' : '' } id="bookAssign${book.id}" onclick="assignBook(${book.id}, ${studentId})" >Assign</button></td>` +
    `</tr>`;
}

const fetchRequset = (param) => {
  return fetch(url + param)
    .then(res => {
      return res.clone().json();
    })
}

const fetchBook = () => {
  fetchRequset('?books')
    .then(res => {
      bookBody.innerHTML = ''
      for (let i = 0; i < res.length; i++) {
        bookBody.innerHTML += tableRowBook(res[i]);
      }
    })
    .catch(err => console.log(err));
}

const fetchStudent = () => {
  fetchRequset('?students')
    .then(res => {
      studentBody.innerHTML = ''
      for (let i = 0; i < res.length; i++) {
        studentBody.innerHTML += tableRowStudent(res[i]);
      }
    })
    .catch(err => console.log(err));
}

const searchBook = val => {
  if (val !== '') {
    fetch(url + `?searchBook=${val}`)
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error("Status code error :" + res.status)
      })
      .then(res => {
        if (res) {
          bookBody.innerHTML = ''
          for (let i = 0; i < res.length; i++) {
            bookBody.innerHTML += tableRowBook(res[i]);
          }
        }
      })
      .catch((err) => {
        bookBody.innerHTML = '<h1>Not Found</h1>'
      });
  } else fetchBook()
}
async function showBook(id) {
  const books = await fetchRequset('?books')
  let book = books.find(el => el.id == id)
  let studentsBook = ''
  if (book.students.length > 0) {
    for (let index = 0; index < book.students.length; index++) {
      studentsBook += bookStudent(book.students[index], id);
    }
  }
  Swal.fire({
    title: 'Obout',
    html: '<h3>Book: ' + book.title.toUpperCase() + '</h3>' +
      '<p>Author: ' + book.author + '</p>' +
      '<p>Year: ' + book.year + '</p>' +
      `<p>Count: ${book.count}</p>` +
      '<h3>students who took the book</h3>' +
      `<p id="assignUser${book.id}">`+(studentsBook ? studentsBook : 'no one took')+"</p>"
  })
}

async function bookList(id) {
  const books = await fetchRequset('?books')
  let bookListTable = ''
  for (let i = 0; i < books.length; i++) {
    bookListTable += bookListModal(books[i], id)

  }
  Swal.fire({
    title: 'Obout' + id,
    text: 'allbooks',
    html: '<table class="table"><thead><th>Book</th><th>Available count</th><th></th></thead>' +
      bookListTable +
      '</table>',
    scrollbarPadding: false
  })
}

const assignBook = (bookId, studentId, elem) => {
  let bookCount = document.getElementById(`book${bookId}`).innerHTML;
  document.getElementById(`book${bookId}`).innerHTML = bookCount - 1
  if (document.getElementById(`book${bookId}`).innerHTML == 0) {
    document.getElementById(`bookAssign${bookId}`).setAttribute("disabled", "");
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookId, studentId }),
  })
    .then(res => {
        if (res.ok) {
          // Swal.fire({
          //   position: 'top-end',
          //   icon: 'success',
          //   title: 'Your work has been saved',
          //   showConfirmButton: false,
          //   timer: 1500
          // })
        }
        else throw new Error("Status code error :" + res.status)
    })
}

const unssingBook = (studentId, bookId) => {
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookId, studentId }),
  })
    .then(res => {
        if (res.ok) {
          document.getElementById(`unssignBook${bookId}`).remove()
          if (document.getElementById(`assignUser${bookId}`).innerHTML == '') {
            document.getElementById(`assignUser${bookId}`).innerHTML = 'no one took'
          }
        }
        else throw new Error("Status code error :" + res.status)
    })
}

const switchBlock = item => {
  switch (item) {
    case 'books':
      fetchBook()
      document.getElementById("studentBtn").classList.remove("active");
      document.getElementById("bookBtn").classList.add("active");
      document.getElementById('searchBook').value = ''
      document.getElementById('bookBlock').style.display = ""
      document.getElementById('studentBlock').style.display = "none"
      break
    case 'students':
      fetchStudent()
      document.getElementById("studentBtn").classList.add("active");
      document.getElementById("bookBtn").classList.remove("active");
      document.getElementById('searchBook').value = ''
      document.getElementById('bookBlock').style.display = "none"
      document.getElementById('studentBlock').style.display = ""
      break
    default:
      return
  }
}

fetchBook()