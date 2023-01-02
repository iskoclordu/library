const myLibrary = [];
const books = document.querySelector('.books');

// this creator is for console control.
// eslint-disable-next-line no-unused-vars
function Book(title, author, genre, page, status = 'Unfinished') {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.page = parseInt(page, 10);
  this.status = status;
}

function getData(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newBook = Object.fromEntries(formData);
  myLibrary.push(newBook);
}

function createBookCard(i) {
  const bookContainer = document.createElement('div');
  books.appendChild(bookContainer);
  bookContainer.classList.add('book-container');
  bookContainer.setAttribute('id', `book-${i}`);

  // book cover elements

  const bookCover = document.createElement('div');
  bookContainer.appendChild(bookCover);
  bookCover.classList.add('book-cover');

  const bookTitle = document.createElement('p');
  bookCover.appendChild(bookTitle);
  bookTitle.classList.add('book-title');
  bookTitle.innerHTML = `<span>${myLibrary[i].title}</span>`;

  const by = document.createElement('p');
  bookCover.appendChild(by);
  by.classList.add('by');
  by.innerHTML = '<span>by</span>';

  const author = document.createElement('p');
  bookCover.appendChild(author);
  author.classList.add('author');
  author.innerHTML = `<span>${myLibrary[i].author}</span>`;

  // book info elements

  const bookInfo = document.createElement('div');
  bookContainer.appendChild(bookInfo);
  bookInfo.classList.add('book-info');

  const labelType = document.createElement('p');
  bookInfo.appendChild(labelType);
  labelType.classList.add('label');
  labelType.innerHTML = '<span>Type:</span>';

  const type = document.createElement('p');
  bookInfo.appendChild(type);
  type.classList.add('type');
  type.innerHTML = `<span>${myLibrary[i].genre}</span>`;

  const labelPages = document.createElement('p');
  bookInfo.appendChild(labelPages);
  labelPages.classList.add('label');
  labelPages.innerHTML = '<span>No of Pages:</span>';

  const pages = document.createElement('p');
  bookInfo.appendChild(pages);
  pages.classList.add('pages');
  pages.innerHTML = `<span>${myLibrary[i].page}</span>`;

  const labelStatus = document.createElement('p');
  bookInfo.appendChild(labelStatus);
  labelStatus.classList.add('label');
  labelStatus.innerHTML = '<span>Status:</span>';

  const status = document.createElement('p');
  bookInfo.appendChild(status);
  status.classList.add('status');
  status.innerHTML = `<span>${myLibrary[i].status}</span>`;

  // button elements

  const buttonsBook = document.createElement('div');
  bookContainer.appendChild(buttonsBook);
  buttonsBook.classList.add('buttons-book');

  const deleteButton = document.createElement('button');
  buttonsBook.appendChild(deleteButton);
  deleteButton.classList.add('delete-card');
  deleteButton.setAttribute('id', `${i}`);
  deleteButton.innerHTML = 'Delete';

  const changeStatusButton = document.createElement('button');
  buttonsBook.appendChild(changeStatusButton);
  changeStatusButton.classList.add('change-status');

  if (myLibrary[i].status === 'Unfinished') {
    changeStatusButton.innerHTML = 'Mark as Read';
  } else if (myLibrary[i].status === 'Finished') {
    changeStatusButton.innerHTML = 'Mark as Unread';
  }
  changeStatusButton.setAttribute('id', `${i}`);
}

let remove = document.querySelectorAll('button.delete-card');
let statusChange = document.querySelectorAll('button.change-status');

function showLibrary() {
  books.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i += 1) {
    createBookCard(i);
  }

  remove = document.querySelectorAll('button.delete-card');
  for (let i = 0; i < remove.length; i += 1) {
    remove[i].addEventListener('click', (e) => {
      const indexNumber = e.target.id;
      // eslint-disable-next-line no-use-before-define
      removeBook(indexNumber);
    });
  }

  statusChange = document.querySelectorAll('button.change-status');
  for (let i = 0; i < statusChange.length; i += 1) {
    statusChange[i].addEventListener('click', (e) => {
      const indexNumber = e.target.id;
      // eslint-disable-next-line no-use-before-define
      changeStatus(indexNumber);
    });
  }

  // eslint-disable-next-line no-use-before-define
  getOccuranceOfGenres();

  // eslint-disable-next-line no-use-before-define
  updateStats();
}

function removeBook(indexNumber) {
  myLibrary.splice(indexNumber, 1);
  showLibrary();
}

function changeStatus(indexNumber) {
  if (myLibrary[indexNumber].status === 'Unfinished') {
    myLibrary[indexNumber].status = 'Finished';
  } else if (myLibrary[indexNumber].status === 'Finished') {
    myLibrary[indexNumber].status = 'Unfinished';
  }
  showLibrary();
}

const add = document.querySelector('.add-book');
add.addEventListener('submit', getData);
add.addEventListener('submit', showLibrary);

// Sorting and Stats

let finishedBooks = myLibrary.filter((book) => book.status === 'Finished');

let genres = [];
let genreCounts = {};
const genreCountsArray = [];

function getOccuranceOfGenres() {
  genres = [];
  finishedBooks = myLibrary.filter((book) => book.status === 'Finished');
  finishedBooks.map((book) => genres.push(book.genre));
  genreCounts = {};
  for (const genre of genres) {
    genreCounts[genre] = genreCounts[genre] ? genreCounts[genre] + 1 : 1;
  }

  return genreCounts;
}

function updateStats() {
  const noOfBooks = document.querySelector('p #no-of-books');
  const no = myLibrary.length;
  noOfBooks.innerHTML = `${myLibrary.length}`;

  const noOfFinished = document.querySelector('#no-of-finished');
  const finishedBooks = myLibrary.filter((book) => book.status === 'Finished');
  noOfFinished.innerHTML = `${finishedBooks.length}`;

  const noOfPagesFinished = document.querySelector('#no-of-pages');
  const pages = [];
  finishedBooks.map((book) => pages.push(book.page));
  const countPages = pages.reduce((partialSum, a) => partialSum + parseInt(a, 10), 0);
  noOfPagesFinished.innerHTML = `${countPages}`;

  const favGenre = document.querySelector('#fav-genre');
  genreCountsArray.length = 0;
  for (const genre in genreCounts) {
    genreCountsArray.push([genre, genreCounts[genre]]);
  }

  const sortedGenreCounts = genreCountsArray.sort((a, b) => a[1] - b[1]);
  console.table(sortedGenreCounts);
  favGenre.innerHTML = `${sortedGenreCounts[(sortedGenreCounts.length) - 1][0]}`;
}
