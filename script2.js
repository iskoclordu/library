// eslint-disable-next-line max-classes-per-file
const bookShelves = document.querySelector('.books');
class Library {
  books = [];

  finishedBooks = [];

  genres = [];

  constructor(name) {
    this.name = name;
  }

  remove(id) {
    this.books.splice(id, 1);
  }

  getOccuranceOfGenres() {
    this.genres = [];
    this.finishedBooks = this.books.filter((book) => book.status === 'Finished');
    this.finishedBooks.map((book) => this.genres.push(book.genre));
    const genreCounts = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const genre of this.genres) {
      genreCounts[genre] = genreCounts[genre] ? genreCounts[genre] + 1 : 1;
    }

    return genreCounts;
  }

  updateStats() {
    const noOfBooks = document.querySelector('p #no-of-books');

    const noOfFinished = document.querySelector('#no-of-finished');
    const finishedBooks = this.books.filter((book) => book.status === 'Finished');

    const noOfPagesFinished = document.querySelector('#no-of-pages');
    const pages = [];
    finishedBooks.map((book) => pages.push(book.noOfPage));
    const countPages = pages.reduce((partialSum, a) => partialSum + parseInt(a, 10), 0);

    const favGenre = document.querySelector('#fav-genre');
    const genreCounts = this.getOccuranceOfGenres();
    const genreCountsArray = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const genre in genreCounts) {
      genreCountsArray.push([genre, genreCounts[genre]]);
    }
    const sortedGenreCounts = genreCountsArray.sort((a, b) => a[1] - b[1]);

    if (this.books.length > 0) {
      noOfBooks.innerHTML = `${this.books.length}`;

      noOfFinished.innerHTML = `${finishedBooks.length}`;

      noOfPagesFinished.innerHTML = `${countPages}`;

      favGenre.innerHTML = `${sortedGenreCounts[(sortedGenreCounts.length) - 1][0]}`;
    } else {
      noOfBooks.innerHTML = '0';

      noOfFinished.innerHTML = '0';

      noOfPagesFinished.innerHTML = '0';

      favGenre.innerHTML = '...';
    }
  }

  showLibrary() {
    bookShelves.innerHTML = '';

    for (let i = 0; i < this.books.length; i += 1) {
      createBookCard(i);
    }

    const remove = document.querySelectorAll('button.delete-card');
    for (let i = 0; i < remove.length; i += 1) {
      remove[i].addEventListener('click', (e) => {
        const indexNumber = e.target.id;
        this.remove(indexNumber);
        this.showLibrary();
      });
    }

    const statusChange = document.querySelectorAll('button.change-status');
    for (let i = 0; i < statusChange.length; i += 1) {
      statusChange[i].addEventListener('click', (e) => {
        const indexNumber = e.target.id;
        this.books[indexNumber].toggleStatus();
        this.showLibrary();
      });
    }

    this.updateStats();
  }
}

class Book {
  constructor() {
    this.title = document.querySelector('form #title').value;
    this.author = document.querySelector('form #author').value;
    this.genre = document.querySelector('form #genre').value;
    this.noOfPage = parseInt(document.querySelector('form #page').value, 10);
    this.status = document.querySelector('input[name="status"]:checked').value;
  }

  toggleStatus() {
    if (this.status === 'Finished') { this.status = 'Unfinished'; } else if (this.status === 'Unfinished') { this.status = 'Finished'; }
  }
}

const lord = new Library('lord');

function createBookCard(i) {
  const bookContainer = document.createElement('div');
  bookShelves.appendChild(bookContainer);
  bookContainer.classList.add('book-container');
  bookContainer.setAttribute('id', `book ${i}`);

  // book cover elements

  const bookCover = document.createElement('div');
  bookContainer.appendChild(bookCover);
  bookCover.classList.add('book-cover');

  const bookTitle = document.createElement('p');
  bookCover.appendChild(bookTitle);
  bookTitle.classList.add('book-title');
  bookTitle.innerHTML = `<span>${lord.books[i].title}</span>`;

  const by = document.createElement('p');
  bookCover.appendChild(by);
  by.classList.add('by');
  by.innerHTML = '<span>by</span>';

  const author = document.createElement('p');
  bookCover.appendChild(author);
  author.classList.add('author');
  author.innerHTML = `<span>${lord.books[i].author}</span>`;

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
  type.innerHTML = `<span>${lord.books[i].genre}</span>`;

  const labelPages = document.createElement('p');
  bookInfo.appendChild(labelPages);
  labelPages.classList.add('label');
  labelPages.innerHTML = '<span>No of Pages:</span>';

  const pages = document.createElement('p');
  bookInfo.appendChild(pages);
  pages.classList.add('pages');
  pages.innerHTML = `<span>${lord.books[i].noOfPage}</span>`;

  const labelStatus = document.createElement('p');
  bookInfo.appendChild(labelStatus);
  labelStatus.classList.add('label');
  labelStatus.innerHTML = '<span>Status:</span>';

  const status = document.createElement('p');
  bookInfo.appendChild(status);
  status.classList.add('status');
  status.innerHTML = `<span>${lord.books[i].status}</span>`;

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

  if (lord.books[i].status === 'Unfinished') {
    changeStatusButton.innerHTML = 'Mark as Read';
  } else if (lord.books[i].status === 'Finished') {
    changeStatusButton.innerHTML = 'Mark as Unread';
  }
  changeStatusButton.setAttribute('id', `${i}`);
}

function addBook() {
  const book = new Book();
  lord.books.push(book);
  lord.showLibrary();
}

const add = document.querySelector('.form-button button');
add.addEventListener('click', addBook);
