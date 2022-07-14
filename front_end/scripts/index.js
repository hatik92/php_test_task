let url = '../back_end/public/index.php';
const bookBody = document.getElementById('bookTableBody')
const studentBody = document.getElementById('studentTableBody')
const bodyLoader = document.getElementById('bodyLoading')
const bookImg = document.getElementById('bookImg')
const loader = document.createElement('div')
loader.classList.add("loader");
const fetchRequset = (param) => {
  return fetch(url + param)
    .then(res => {
      let viewBook = document.getElementsByClassName('bookView')
      for (let i = 0; i < viewBook.length; i++) {
        viewBook[i].removeAttribute('disabled');
      }
      // document.getElementsByClassName('bookView').removeAttribute('disabled')
      return res.clone().json();
    })
}

const tableRowBook = (book) => {
  return `<tr>` +
    `<th scope='row'>${book.id}</th>` +
    `<td>${book.title.toUpperCase()}</td>` +
    `<td>${book.author}</td>` +
    `<td>${book.year}</td>` +
    `<td>${book.count}</td>` +
    `<td id="bookConut${book.id}">${book.available}</td>` +
    `<td><button class='btn btn-warning bookView' onclick="showBook(${book.id})" >View</button></td>` +
    `</tr>`;
}

const tableRowStudent = (student) => {
  return `<tr>` +
    `<th scope='row'>${student.id}</th>` +
    `<td>${student.name}</td>` +
    `<td>${student.surname}</td>` +
    `<td><button class='btn btn-warning' onclick="bookList(${student.id})">Assign book</button></td>` +
    `</tr>`;
}

const bookStudent = (student, bookId) => {
  return `<li ` +
    `class="list-group-item d-flex justify-content-between"` +
    `align-items-center" id="unssignBook${bookId}">` +
    `Name: ${student.surname}` +
    `<button class='btn btn-warning' onclick="unssignBook(${student.id}, ${bookId})">Unssign` +
    `</button>` +
    `</li>`;
}

const bookListModal = (book, studentId) => {
  return `<tr>` +
    `<td>${book.title.toUpperCase()}</td>` +
    `<td id="book${book.id}">${book.available}</td>` +
    `<td><button class='btn btn-warning assignBtn' ${book.available == 0 || book.disabled ? 'disabled' : ''} id="bookAssign${book.id}" onclick="assignBook(${book.id}, ${studentId})" >Assign</button></td>` +
    `</tr>`;
}

const fetchBook = () => {
  console.log(bodyLoader);
  bookImg.style.display = "none"
  bodyLoader.style.display = "block"
  fetchRequset('?books')
    .then(res => {
      bodyLoader.style.display = "none"
      bookImg.style.display = "block"
      bookBody.innerHTML = ''
      for (let i = 0; i < res.length; i++) {
        bookBody.innerHTML += tableRowBook(res[i]);
      }
    })
    .catch(err => console.log(err));
}

const fetchStudent = () => {
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  fetchRequset('?students')
    .then(res => {
      bodyLoader.style.display = "none"
      bookImg.style.display = "block"
      studentBody.innerHTML = ''
      for (let i = 0; i < res.length; i++) {
        studentBody.innerHTML += tableRowStudent(res[i]);
      }
    })
    .catch(err => console.log(err));
}

const searchBook = val => {
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  if (val !== '') {
    fetch(url + `?searchBook=${val}`)
      .then(res => {
        bodyLoader.style.display = "none"
        bookImg.style.display = "block"
        if (!res.ok) throw new Error("Status code error :" + res.status)
        return res.json();
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

const searchStudent = val => {
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  if (val !== '') {
    fetch(url + `?searchStudent=${val}`)
      .then(res => {
        bodyLoader.style.display = "none"
        bookImg.style.display = "block"
        if (!res.ok) throw new Error("Status code error :" + res.status)
        return res.json();
      })
      .then(res => {
        if (res) {
          console.log(res);
          studentBody.innerHTML = ''
          for (let i = 0; i < res.length; i++) {
            studentBody.innerHTML += tableRowStudent(res[i]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        studentBody.innerHTML = '<h1>Not Found</h1>'
      });
  } else fetchStudent()
}
async function showBook(id) {
  let viewBook = document.getElementsByClassName('bookView')
  for (let i = 0; i < viewBook.length; i++) {
    viewBook[i].setAttribute('disabled', '');
  }
  // document.getElementsByClassName('bookView').setAttribute('disabled', '')
  const books = await fetchRequset('?books')
  let book = books.find(el => el.id == id)
  let studentsBook = ''
  if (book.students.length > 0) {
    for (let index = 0; index < book.students.length; index++) {
      studentsBook += bookStudent(book.students[index], id);
    }
  }
  Swal.fire({
    customClass: 'swal-height',
    title: 'About',
    html: '<h3>Book: ' + book.title.toUpperCase() + '</h3>' +
      '<p>Author: ' + book.author + '</p>' +
      '<p>Year: ' + book.year + '</p>' +
      `<p>Available count: <span id="availableCount${book.id}"> ${book.available}</span></p>` +
      '<h3>students who took the book</h3>' +
      `<ul class="list-group" id="bookObout${book.id}">` + (studentsBook ? studentsBook : '<p>no one took</p>') + '</ul>'
  }).then((value) => {
    location.reload()
  })
}

async function bookList(studentId) {
  const books = await fetchRequset('?books')
  let bookListTable = ''
  for (let i = 0; i < books.length; i++) {
    // debugger
    for (let j = 0; j < books[i].students.length; j++) {
      if (books[i].students[j].id == studentId) {
        books[i].disabled = true
        break;
      }
    }
    bookListTable += bookListModal(books[i], studentId)

  }
  Swal.fire({
    title: 'Obout' + studentId,
    text: 'allbooks',
    html: '<table class="table"><thead><th>Book</th><th>Available count</th><th></th></thead>' +
      bookListTable +
      '</table>',
    customClass: 'swal-height'
  })
}

const assignBook = (bookId, studentId, elem) => {

  document.getElementById(`bookAssign${bookId}`).setAttribute("disabled", "");
  document.getElementById(`bookAssign${bookId}`).textContent = '';
  document.getElementById(`bookAssign${bookId}`).appendChild(loader);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookId, studentId }),
  })
    .then(res => {
      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: res.statusText,
          text: 'Something went wrong!',
        })
      } else {
        // document.getElementsByClassName('loader').remove();
        document.getElementById(`bookAssign${bookId}`).textContent = 'Assign';
        // document.getElementById(`bookAssign${bookId}`).removeAttribute("disabled");
        let bookCount = document.getElementById(`book${bookId}`).innerHTML;
        document.getElementById(`book${bookId}`).innerHTML = bookCount - 1
        if (document.getElementById(`book${bookId}`).innerHTML == 0) {
          document.getElementById(`bookAssign${bookId}`).setAttribute("disabled", "");
        }
      }
    })
    .catch(err => console.log(err))
}

const unssignBook = (studentId, bookId) => {
  document.getElementById(`unssignBook${bookId}`).setAttribute("disabled", "");
  let availableCount = document.getElementById(`availableCount${bookId}`).innerHTML
  console.log(availableCount);
  document.getElementById(`availableCount${bookId}`).innerHTML = +availableCount + 1
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bookId, studentId }),
  })
    .then(res => {
      if (res.ok) {
        let bookCount = window.document.getElementById(`bookCount${bookId}`)
        console.log(bookCount);
        // window.document.getElementById(`bookCount${bookId}`).innerHTML = bookCount + 1
        document.getElementById(`unssignBook${bookId}`).remove()
        if (document.getElementById(`bookObout${bookId}`).innerHTML == '') {
          document.getElementById(`bookObout${bookId}`).innerHTML = 'no one took'
        }
      }
      else throw new Error("Status code error :" + res.status)
    })
    .catch(err => console.log(err))
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










const assignBook = document.querySelectorAll(`[id*="bookAssign"]`);
            assignBook.forEach(el => el.addEventListener('click', event => {
              let studentId = event.target.getAttribute("data-studentId")
              let bookId = event.target.getAttribute("data-bookId")
              el.setAttribute("disabled", "");
              el.textContent = '';
              el.appendChild(loader);
              fetch(url + '?books', {
                method: 'POST',
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                body: JSON.stringify({ bookId, studentId }),
              })
                .then(res => {
                  if (!res.ok) {
                    Swal.fire({
                      icon: 'error',
                      title: res.statusText,
                      text: 'Something went wrong!',
                    })
                  } else {
                    console.log(el);
                    // document.getElementsByClassName('loader').remove();
                    el.textContent = 'Unassign';
                    el.style.display = 'none';
                    document.getElementById(`bookUnassign${bookId}`).style.display = 'flex'
                    // el.classList.remove('btn-success');
                    // el.classList.add('btn-danger');
                    // el.id = `bookUnassign${bookId}`
                    // el.removeAttribute("disabled");
                    let bookCount = document.getElementById(`book${bookId}`).innerHTML;
                    document.getElementById(`book${bookId}`).innerHTML = bookCount - 1
                    // if (document.getElementById(`book${bookId}`).innerHTML == 0) {
                    //   el.setAttribute("disabled", "");
                    // }
                  }
                })
                .catch(err => console.log(err))
            }))