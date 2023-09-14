const RENDER_EVENT = 'render-todo';
const books = []

function isCheck(){
  const check = document.getElementById('inputBookIsComplete').checked;
  let span = document.getElementById('bookSubmit');
  if(check){
    span.childNodes[1].innerText = "Selesai dibaca"
  }else{
    span.childNodes[1].innerText = "Belum selesai dibaca"
  }
}

function addBook(){
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const generatedID = generatedId();

  const bookObject = generateBookObject(generatedID, title, author, year, isComplete);
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function generatedId(){
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete){
  return {
    id: id,
    title,
    author,
    year,
    isComplete
  }
}

function makeBook(bookObject){
  const bookTitle = document.createElement('h3');
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement('p');
  bookAuthor.innerText = bookObject.author;

  const bookYear = document.createElement('p');
  bookYear.innerText = bookObject.year;

  const bookAction = document.createElement('div');
  bookAction.classList.add('action');

  const bookActionEdit = document.createElement('button');
  bookActionEdit.classList.add('green');
  if(bookObject.isComplete){
    bookActionEdit.innerText = 'Selesai dibaca';
  }else{
    bookActionEdit.innerText = 'Belum selesai dibaca';
  }

  const bookActionDelete = document.createElement('button');
  bookActionDelete.classList.add('red');
  bookActionDelete.innerText = 'Hapus buku';

  bookAction.append(bookActionEdit, bookActionDelete);
  

  const bookContainer = document.createElement('article');
  bookContainer.classList.add('book_item');
  bookContainer.append(bookTitle, bookAuthor, bookYear, bookAction);
  bookContainer.setAttribute('data-id', bookObject.id);

  return bookContainer;
}

document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });
});

document.addEventListener(RENDER_EVENT, function () {
  // console.log(books);
  const bookUncompleted = document.getElementById('incompleteBookshelfList');
  const bookCompleted = document.getElementById('completeBookshelfList');

  bookUncompleted.innerHTML = '';
  bookCompleted.innerHTML = '';

  for(const book of books){
    console.log('====================================');
    console.log(book);
    console.log('====================================');
    const newBook = makeBook(book);
    if(book.isComplete){
      bookCompleted.append(newBook);
    }else{
      bookUncompleted.append(newBook);
    }
  }
});

