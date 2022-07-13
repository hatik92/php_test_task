import { bodyLoader, bookBody, bookImg, fetchBook, fetchStudent, studentBody, tableRowBook, url } from "./functions.js";

// const loader = document.createElement('div')
// loader.classList.add("loader");

document.getElementById('searchBook').addEventListener('change', (val) => {
  let searchVal = val.target.value
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  if (searchVal !== '') {
    fetch(url + `?books-searchBook=${searchVal}`)
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
        console.log(err);
        bookBody.innerHTML = '<h1>Not Found</h1>'
      });
  } else fetchBook()
});

document.getElementById('searchStudent').addEventListener('change', val => {
  let searchVal = val.target.value
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  if (searchVal !== '') {
    fetch(url + `?searchStudent=${searchVal}`)
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
})
// const showBook = document.querySelector(`[id*="bookView"]`);
// console.log(showBook);
// showBook.forEach(el => el.addEventListener('click', event => {
//   console.log(123);
// }));
// async function showBook(id) {
  
//   let viewBook = document.getElementsByClassName('bookView')
//   for (let i = 0; i < viewBook.length; i++) {
//     viewBook[i].setAttribute('disabled', '');
//   }
//   // document.getElementsByClassName('bookView').setAttribute('disabled', '')
//   const books = await fetchRequset('?books')
//   let book = books.find(el => el.id == id)
//   window.book = book
//   window.open(
//     "http://books-task.test/front_end/bookView.html", "_blank");
// }

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

const unassignBook = (studentId, bookId) => {
  document.getElementById(`unassignBook${bookId}`).setAttribute("disabled", "");
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
        document.getElementById(`unassign${bookId}`).remove()
        if (document.getElementById(`bookObout${bookId}`).innerHTML == '') {
          document.getElementById(`bookObout${bookId}`).innerHTML = 'no one took'
        }
      }
      else throw new Error("Status code error :" + res.status)
    })
    .catch(err => console.log(err))
}

document.getElementById('switchBtn').addEventListener('click', (item) => {
  switch (item.target.value) {
    case 'Go to books':
      fetchBook()
      // window.history.pushState("object or string", "Title", "/books");
      bookBody.innerHTML = ''
      document.getElementById('bookImg').className = 'bookImg'
      document.getElementById('switchBtn').value = 'Go to students'
      document.getElementById('searchBook').value = ''
      document.getElementById('bookBlock').style.display = ""
      document.getElementById('studentBlock').style.display = "none"
      break
      case 'Go to students':
      fetchStudent()
      studentBody.innerHTML = ''
      // window.history.pushState("object or string", "Title", "/students");
      document.getElementById('bookImg').className = 'studentImg'
      document.getElementById('switchBtn').value = 'Go to books'
      document.getElementById('searchBook').value = ''
      document.getElementById('bookBlock').style.display = "none"
      document.getElementById('studentBlock').style.display = ""
      break
    default:
      return
  }
})
fetchBook()

// const pathname = window.location.pathname.split('/')
//   console.log(pathname);
//   switch (pathname[1]) {
//     case 'books': 
//       fetchBook()
//       break;
//     case 'students':
//       fetchStudent()
//       break;
//     default:
//       console.error("not found: ERROR 404");
//   }