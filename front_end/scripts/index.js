var url = '../../php_test_task/back_end/index.php';


fetch(url+'?book')
  .then(function (response) {
    return response.text();
  })
  .then(function (body) {
    console.log(JSON.parse(body));
    let books = JSON.parse(body)
    let bookBody = document.getElementById('bookTableBody')
    for (let index = 0; index < books.length; index++) {
      bookBody.innerHTML += `<tr><th scope='row'>${books[index].id}</th><td>${books[index].title}</td><td>${books[index].author}</td><td>${books[index].year}</td><td>${books[index].available}</td><td><button class='btn btn-warning'>View</button></td></tr>`;
    }
  });

function searchBook(val) {
  fetch(url+`?search=${val}`)
  .then(function (response) {
    return response.text();
  })
  .then(function (body) {
    console.log(JSON.parse(body));
    let books = JSON.parse(body)
    let bookBody = document.getElementById('bookTableBody')
    for (let index = 0; index < books.length; index++) {
      bookBody.innerHTML = ''
      bookBody.innerHTML += `<tr><th scope='row'>${books[index].id}</th><td>${books[index].title}</td><td>${books[index].author}</td><td>${books[index].year}</td><td>${books[index].available}</td><td><button class='btn btn-warning'>View</button></td></tr>`;
    }
  });
}