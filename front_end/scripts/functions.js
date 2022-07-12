export let url = '../back_end/public/index.php';
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
    `<td><button class='btn btn-warning' id="assignBookStudent${student.id}" data-id="${student.id}">Assign book</button></td>` +
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
    `<td id="book${book.id}">${book.available}</td>` +
    `<td>` + 
    `${book.disabled
      //toxum enq mi hat
      // disabledi hamar menak assigni hamar 
      ? `<button class='btn btn-danger unassignBtn' data-bookId="${book.id}" data-studentId="${studentId}" id="bookUnassign${book.id}">Unassign</button>` + 
      `<button class='btn btn-success assignBtn' style="display:none;" data-bookId="${book.id}" data-studentId="${studentId}" id="bookAssign${book.id}" ${book.available == 0 ? 'disabled' : ''}>Assign</button>`
      : `<button class='btn btn-danger unassignBtn' style="display:none;" data-bookId="${book.id}" data-studentId="${studentId}" id="bookUnassign${book.id}">Unassign</button>` +
      `<button class='btn btn-success assignBtn' data-bookId="${book.id}" data-studentId="${studentId}" id="bookAssign${book.id}" ${book.available == 0 ? 'disabled' : ''}>Assign</button>`}` + 
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
  return await fetchRequset('?books')
}
export let bobobobo = ''
// console.log(allBooks());
// const allBooks = fetchRequset('?books')
export const fetchBook = () => {
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
        window.open(`http://books-task.test/front_end/bookView.html?book=${id}`);

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
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  fetchRequset('?students')
    .then(res => {
      bodyLoader.style.display = "none"
      bookImg.style.display = "block"
      // studentBody.innerHTML = ''
      for (let i = 0; i < res.length; i++) {
        studentBody.innerHTML += tableRowStudent(res[i]);
      }
      const showBook = document.querySelectorAll(`[id*="assignBookStudent"]`);
      showBook.forEach(el => el.addEventListener('click', event => {
        let id = event.target.getAttribute("data-id")
        allBooks()
          .then(books => {
            let bookListTable = ''
            console.log(res);
            for (let i = 0; i < books.length; i++) {
              for (let j = 0; j < books[i].students.length; j++) {
                if (books[i].students[j].id == id) {
                  books[i].disabled = true
                  break;
                }
              }
              bookListTable += bookListModal(books[i], id)
            }
            Swal.fire({
              title: 'About' + id,
              text: 'allbooks',
              html: '<table class="table"><thead><th>Book</th><th>Available count</th><th></th></thead>' +
                bookListTable +
                '</table>',
              customClass: 'swal-height'
            })
            const assignBook = document.querySelectorAll(`[id*="bookAssign"]`);
            assignBook.forEach(el => el.addEventListener('click', event => {
              // let id = event.target.getAttribute("data-id")
              let studentId = event.target.getAttribute("data-studentId")
              let bookId = event.target.getAttribute("data-bookId")
              el.setAttribute("disabled", "");
              el.textContent = '';
              el.appendChild(loader);
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
            const unassignBook = document.querySelectorAll(`[id*="bookUnassign"]`);
            unassignBook.forEach(el => el.addEventListener('click', event => {
              // let id = event.target.getAttribute("data-id")
              let studentId = event.target.getAttribute("data-studentId")
              let bookId = event.target.getAttribute("data-bookId")
              el.setAttribute("disabled", "");
              el.textContent = '';
              el.appendChild(loader);
              fetch(url, {
                method: 'DELETE',
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
                    // debugger
                    // document.getElementsByClassName('loader').remove();
                    el.textContent = 'Assign';
                    el.style.display = 'none';
                    console.log(document.getElementById(`bookAssign${bookId}`));
                    document.getElementById(`bookAssign${bookId}`).style.display = 'flex'
                    // el.classList.remove('btn-success');
                    // el.classList.add('btn-danger');
                    // el.id = `bookUnassign${bookId}`
                    // el.removeAttribute("disabled");
                    let bookCount = +document.getElementById(`book${bookId}`).innerHTML;
                    // console.log(+bookCount);
                    document.getElementById(`book${bookId}`).innerHTML = bookCount + 1
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

