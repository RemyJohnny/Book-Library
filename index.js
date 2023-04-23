const addBookIcon = document.querySelector(".addIcon");
const header = document.querySelector("header");
const addBookForm = document.querySelector(".addBook-form");
const spanLabel = document.querySelector("span.label");
const libraryHeader = document.querySelector("h1.libraryheader");
const library = document.querySelector(".library");
const addBookBtn = document.querySelector("#addBook");
const inputs = document.querySelectorAll("input");
const toggleReadStatus = document.querySelectorAll('input[type="checkbox');
const inputsArr = Array.from(inputs);

addBookIcon.addEventListener("mouseenter", function () {
  spanLabel.classList.add("hovered");
  if (spanLabel.classList.contains("open")) {
    spanLabel.textContent = "close portal";
  } else {
    spanLabel.textContent = "click to add book";
  }
});
addBookIcon.addEventListener("mouseleave", function () {
  spanLabel.classList.remove("hovered");
});
addBookIcon.addEventListener("click", function () {
  formOpenStateChange();
});
function formOpenStateChange() {
  header.classList.toggle("Blur");
  libraryHeader.classList.toggle("Blur");
  library.classList.toggle("Blur");
  addBookForm.classList.toggle("show");
  spanLabel.classList.remove("hovered");
  addBookIcon.classList.toggle("open");
  spanLabel.classList.toggle("open");
}

let myLibrary = [];

class Book {
  constructor(title, author, pages, year, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.readStatus = status;
  }
}
class bookLibrary {
  constructor() {
    this.books = [];
  }
  AddBook(newBook) {
    if (!this.checkExistence(newBook)) {
      this.books.push(newBook);
    }
  }
  deleteBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
  findBook(title) {
    return this.books.find((book) => book.title === title);
  }
  checkExistence(newBook) {
    return this.books.some((book) => {
      book.title === newBook.title && book.author === newBook.author;
    });
  }
}
const BOOKLibrary = new bookLibrary();

function updateLibrary() {
  library.innerHTML = "";
  for (let book of BOOKLibrary.books) {
    makeBook(book);
  }
}

function getInput() {
  const bookName = document.querySelector("#title");
  const writer = document.querySelector("#author");
  const pageNum = document.querySelector("#pages");
  const year = document.querySelector("#year");
  const readStatus = document.querySelector("#status");
  if (
    bookName.value === "" ||
    writer.value === "" ||
    pageNum.value === "" ||
    year.value === ""
  ) {
    return;
  } else {
    let newBook = new Book(
      bookName.value,
      writer.value,
      pageNum.value,
      year.value,
      readStatus.value
    );
    clearInput();
    formOpenStateChange();
    console.log(BOOKLibrary.books);
    return newBook;
  }
}

/*addBook button event listener*/
addBookBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const newBook = getInput();
  if (BOOKLibrary.checkExistence(newBook)) {
    alert("You already have this book in your library");
    console.log("already in");
    return;
  } else {
    BOOKLibrary.AddBook(newBook);
    updateLibrary();
  }
});

function clearInput() {
  inputsArr.forEach(function (input) {
    input.value = "";
  });
}

function makeBook(BOOK) {
  const book = document.createElement("div");
  book.classList.add("book");
  library.appendChild(book);
  const deleteBtn = document.createElement("div");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
<path
  d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
/>
</svg>`;
  book.appendChild(deleteBtn);
  const title = document.createElement("div");
  title.classList.add("bookName");
  title.innerHTML = BOOK.title;
  book.appendChild(title);
  const author = document.createElement("div");
  author.classList.add("writer");
  author.textContent = `Written by : ${BOOK.author}`;
  book.appendChild(author);
  const bookMain = document.createElement("div");
  bookMain.classList.add("bookMain");
  book.appendChild(bookMain);
  const info = document.createElement("div");
  info.classList.add("info");
  bookMain.appendChild(info);
  const page = document.createElement("div");
  page.classList.add("page");
  page.textContent = `${BOOK.pages} pages`;
  info.appendChild(page);
  const year = document.createElement("div");
  year.classList.add("year");
  year.textContent = `published in ${BOOK.year}`;
  info.appendChild(year);
  const status = document.createElement("div");
  status.classList.add("status");
  bookMain.appendChild(status);
  const labelDiv = document.createElement("div");
  labelDiv.classList.add("labelDiv");
  status.appendChild(labelDiv);
  const toggleStatus = document.createElement("button");
  toggleStatus.textContent = "toggle status";
  labelDiv.appendChild(toggleStatus);
  const statusLabel = document.createElement("div");
  statusLabel.classList.add("statusLabel");
  statusLabel.textContent = BOOK.readStatus;
  status.appendChild(statusLabel);

  /************************    */
  deleteBtn.addEventListener("click", function (e) {
    const title = e.target.parentNode.nextSibling.innerHTML.replaceAll();
    console.log(title);
    BOOKLibrary.deleteBook(title);
    console.log(BOOKLibrary.books);
    updateLibrary();
  });
  if (statusLabel.textContent !== "read") {
    book.style.background =
      "linear-gradient(-180deg,rgba(255,255,255,0.50) 0%,rgba(0,0,0,0.50)100%)";
  }
  toggleStatus.addEventListener("click", function (e) {
    const title =
      e.target.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerHTML.replaceAll();
    const book = BOOKLibrary.findBook(title);
    console.log(title);
    if (book.readStatus === "read") {
      book.readStatus = "not read";
      updateLibrary();
    } else {
      book.readStatus = "read";
      updateLibrary();
    }
  });
}
