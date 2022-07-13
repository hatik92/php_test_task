export let url = 'http://books-task-api.test/';
export const bookBody = document.getElementById('bookTableBody')
export const studentBody = document.getElementById('studentTableBody')
export const bodyLoader = document.getElementById('bodyLoading')
export const bookImg = document.getElementById('bookImg')
export const loader = document.createElement('div')
loader.classList.add("loader");


export const tableRowBook = (book) => {
  return `<tr>` +
    `<th scope='row'>${book.id}</th>` +
    `<td>${book.title.toUpperCase()}</td>` +
    `<td>${book.author}</td>` +
    `<td>${book.year}</td>` +
    `<td>${book.count}</td>` +
    `<td id="bookConut${book.id}">${book.available}</td>` +
    `<td><button class='btn btn-warning' id="bookView${book.id}" data-id="${book.id}">View</button></td>` +
    `</tr>`;
}

export const tableRowStudent = (student) => {
  return `<tr>` +
    `<th scope='row'>${student.id}</th>` +
    `<td>${student.name}</td>` +
    `<td>${student.surname}</td>` +
    `<td><button class='btn btn-warning' id="assignedBooks${student.id}" data-id="${student.id}">Assigned books</button></td>` +
    `</tr>`;
}

export const bookStudent = (student) => {
  return `<li ` +
    `class="list-group-item d-flex justify-content-between"` +
    `align-items-center" id="unassign${student.id}">` +
    `Name: ${student.surname}` +
    `<button class='btn btn-danger' id="unassignBook${student.id}" data-id="${student.id}">Unassign` +
    `</button>` +
    `</li>`;
}

export const bookListModal = (book, studentId) => {
  return `<tr>` +
    `<td>${book.title.toUpperCase()}</td>` +
    `<td id="book${book.id}">${book.author}</td>` +
    `<td>` +
    `<button class='btn btn-danger unassignBtn' data-takeBookStudent="${book.takeId}" data-studentId="${studentId}" id="bookUnassign${book.id}">Unassign</button>` +
    // `<button class='btn btn-danger unassignBtn' style="${book.disabled ? '' : 'display:none;'}" data-takeBookStudent="${book.id}" data-studentId="${studentId}" id="bookUnassign${book.id}">Unassign</button>` +
    // `<button class='btn btn-success assignBtn' style="${book.disabled ? 'display:none;' : ''}" data-bookId="${book.id}" data-studentId="${studentId}" id="bookAssign${book.id}" ${book.available == 0 || book.disabled ? 'disabled' : ''}>Assign</button>` + 
    // `${book.disabled
    //   //toxum enq mi hat
    //   // disabledi hamar menak assigni hamar 
    //   ? `<button class='btn btn-danger unassignBtn' data-bookId="${book.id}" data-studentId="${studentId}" id="bookUnassign${book.id}">Unassign</button>` + 
    //   `<button class='btn btn-success assignBtn' style="display:none;" data-bookId="${book.id}" data-studentId="${studentId}" id="bookAssign${book.id}" ${book.available == 0 ? 'disabled' : ''}>Assign</button>`
    //   : `<button class='btn btn-danger unassignBtn' style="display:none;" data-bookId="${book.id}" data-studentId="${studentId}" id="bookUnassign${book.id}">Unassign</button>` +
    //   `<button class='btn btn-success assignBtn' data-bookId="${book.id}" data-studentId="${studentId}" id="bookAssign${book.id}" ${book.available == 0 ? 'disabled' : ''}>Assign</button>`}` + 
    `</td>` +
    `</tr>`;
}

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
async function allBooks() {
  return await fetchRequset('?books-allBooks')
}
async function takingBooks(id) {
  return await fetchRequset('?books-takingBooks=' + id)
}
export const fetchBook = () => {
  // window.history.pushState("", "", "/books");

  bookImg.style.display = "none"
  bodyLoader.style.display = "block"
  allBooks()
    .then(res => {
      bodyLoader.style.display = "none"
      bookImg.style.display = "block"
      // bookBody.innerHTML = ''
      for (let i = 0; i < res.length; i++) {
        bookBody.innerHTML += tableRowBook(res[i]);
      }
      const showBook = document.querySelectorAll(`[id*="bookView"]`);
      showBook.forEach(el => el.addEventListener('click', event => {
        let id = event.target.getAttribute("data-id")
        window.open(`http://books-task.test/bookView.html?book=${id}`);

        let viewBook = document.getElementsByClassName('bookView')
        for (let i = 0; i < viewBook.length; i++) {
          viewBook[i].setAttribute('disabled', '');
        }
        let book = res.find(el => el.id == id)
        let studentsBook = ''
        if (book.students.length > 0) {
          for (let index = 0; index < book.students.length; index++) {
            studentsBook += bookStudent(book.students[index], id);
          }
        }
      }));
    })
    .catch(err => console.log(err));
}

export const fetchStudent = () => {
  // window.history.pushState("", "", "/students");

  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  fetchRequset('?students-allStudents')
    .then(students => {
      bodyLoader.style.display = "none"
      bookImg.style.display = "block"
      // studentBody.innerHTML = ''
      for (let i = 0; i < students.length; i++) {
        studentBody.innerHTML += tableRowStudent(students[i]);
      }
      const showBook = document.querySelectorAll(`[id*="assignedBooks"]`);
      showBook.forEach(el => el.addEventListener('click', event => {
        let id = event.target.getAttribute("data-id")
        takingBooks(id)
          .then(books => {
            let bookListTable = ''
            if (books.length == 0) {
              bookListTable = '<h2>No assigned books</h2>'
            } else {
              for (let i = 0; i < books.length; i++) {
                bookListTable += bookListModal(books[i], id)
              }
              bookListTable = '<div id="assignedBooksBlock"><table class="table"><thead><th>Book</th><th>Author</th><th></th></thead><tbody id="assignedBooksTableBody">' +
                bookListTable +
                '</tbody></table></div>'
            }
            Swal.fire({
              title: 'Assigned books',
              text: 'allbooks',
              html: bookListTable,
              customClass: 'swal-height'
            })
            
            const unassignBook = document.querySelectorAll(`[id*="bookUnassign"]`);
            unassignBook.forEach(el => el.addEventListener('click', event => {
              // let id = event.target.getAttribute("data-id")
              let takeBookStudent = event.target.getAttribute("data-takeBookStudent")
              let studentId = event.target.getAttribute("data-studentId")
              let bookId = event.target.getAttribute("data-bookId")
              el.setAttribute("disabled", "");
              el.textContent = '';
              el.appendChild(loader);
              fetch(url + `?books-delete=${takeBookStudent}`
              // , {
              //   method: 'DELETE'
              // }
              )
                .then(res => {
                  if (!res.ok) {
                    Swal.fire({
                      icon: 'error',
                      title: res.statusText,
                      text: 'Something went wrong!',
                    })
                  } else {
                    el.parentElement.parentElement.remove()
                    if (document.getElementById('assignedBooksTableBody').innerHTML == '') {
                      // document.getElementById('assignedBooksTableBody').remove()
                      document.getElementById('assignedBooksBlock').innerHTML = '<h2>No assigned books</h2>'
                    }
                    // debugger
                    // document.getElementsByClassName('loader').remove();
                    // el.textContent = 'Assign';
                    // el.style.display = 'none';
                    // console.log(document.getElementById(`bookAssign${bookId}`));
                    // document.getElementById(`bookAssign${bookId}`).style.display = 'flex'
                    // el.classList.remove('btn-success');
                    // el.classList.add('btn-danger');
                    // el.id = `bookUnassign${bookId}`
                    // el.removeAttribute("disabled");
                    // let bookCount = +document.getElementById(`book${bookId}`).innerHTML;
                    // console.log(+bookCount);
                    // document.getElementById(`book${bookId}`).innerHTML = bookCount + 1
                    // if (document.getElementById(`book${bookId}`).innerHTML == 0) {
                    //   el.setAttribute("disabled", "");
                    // }
                  }
                })
                .catch(err => console.log(err))
            }))
          })
      }));
    })
    .catch(err => console.log(err));
}

