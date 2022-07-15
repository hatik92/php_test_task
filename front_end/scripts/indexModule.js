import { bodyLoader, bookBody, bookImg, fetchBook, fetchStudent, searchStudent, studentBody, tableRowBook, tableRowStudent, url } from "./functions.js";

document.getElementById('searchBook').addEventListener('change', (val) => {
  let searchVal = val.target.value
  bodyLoader.style.display = "block"
  bookImg.style.display = "none"
  if (searchVal !== '') {
    fetch(url + `books/?search=${searchVal}`)
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
    searchStudent(searchVal)
    .then(res => {
      bodyLoader.style.display = "none"
      bookImg.style.display = "block"
      if (!res.ok) throw new Error("Status code error :" + res.status)
      return res.json();
    })
    .then(res => {
      if (res) {
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

document.getElementById('switchBtn').addEventListener('click', (item) => {
  switch (item.target.value) {
    case 'Go to books':
      fetchBook()
      // window.history.pushState("object or string", "Title", "/books");
      bookBody.innerHTML = ''
      document.getElementById('bookImg').className = 'bookImg'
      document.getElementById('switchBtn').value = 'Go to students'
      document.getElementById('searchBook').value = ''
      document.getElementById('searchStudent').value = ''
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
      document.getElementById('searchStudent').value = ''
      document.getElementById('bookBlock').style.display = "none"
      document.getElementById('studentBlock').style.display = ""
      break
    default:
      return
  }
})
fetchBook()