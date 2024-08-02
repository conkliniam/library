const myLibrary = [];
const addBook = document.querySelector("#add-book");
const author = document.querySelector("#author");
const title = document.querySelector("#title");
const pages = document.querySelector("#pages");
const yesRead = document.querySelector("#yes-read");
const noRead = document.querySelector("#no-read");
const imageLink = document.querySelector("#image-link");
const bookDisplay = document.querySelector(".book-display");
const bookTemplate = document.querySelector(".book-template");
const newBook = document.querySelector("#new-book");
const addBookDialog = document.querySelector("#add-book-dialog");
const closeDialog = document.querySelector("#close-dialog");

addBook.addEventListener("click", handleAddBook);
newBook.addEventListener("click", openBookDialog);
closeDialog.addEventListener("click", () => addBookDialog.close());

class Book {
  constructor(author, title, pages, read, url = "") {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.url = url;
  }

  info() {
    return `${this.pages} pages. ${this.read ? "Read" : "Not Read"}`;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function openBookDialog() {
  addBookDialog.showModal();
}

function seedLibrary() {
  myLibrary.push(
    new Book(
      "J.K. Rowling",
      "Harry Potter and the Sorceror's Stone",
      223,
      true,
      "https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg"
    )
  );
  myLibrary.push(
    new Book(
      "George R.R. Martin",
      "A Game of Thrones",
      694,
      true,
      "https://m.media-amazon.com/images/I/71Jzezm8CBL._AC_UF1000,1000_QL80_.jpg"
    )
  );
  myLibrary.push(
    new Book(
      "Liu Cixin and Ken Liu",
      "The Three Body Problem",
      416,
      true,
      "https://m.media-amazon.com/images/I/61s6hqLkRCL._AC_UF1000,1000_QL80_.jpg"
    )
  );
  myLibrary.push(new Book("John Doe", "The Adventures of Time", 456, false));
}

function checkValidity() {
  return (
    author.checkValidity() &&
    title.checkValidity() &&
    pages.checkValidity() &&
    yesRead.checkValidity() &&
    noRead.checkValidity() &&
    imageLink.checkValidity()
  );
}

function clearFields() {
  author.value = "";
  title.value = "";
  pages.value = "";
  imageLink.value = "";
  yesRead.checked = false;
  noRead.checked = false;
}

function handleAddBook(event) {
  if (checkValidity()) {
    event.preventDefault();
    addBookToLibrary();
    clearFields();
    addBookDialog.close();
  }
}

function addBookToLibrary() {
  const book = new Book(
    author.value,
    title.value,
    pages.value,
    yesRead.checked ? true : false,
    imageLink.value
  );
  myLibrary.push(book);
  displayBook(book);
}

function displayBooks() {
  for (const book of myLibrary) {
    displayBook(book);
  }
}

function displayBook(book) {
  const containerElement = document.createElement("div");
  const titleElement = document.createElement("h2");
  const authorElement = document.createElement("h3");
  const infoElement = document.createElement("p");
  const imageElement = createImageElement(book.url);
  const textContainer = document.createElement("div");
  const buttonContainer = document.createElement("div");
  const deleteElement = document.createElement("button");
  const readButton = document.createElement("button");

  containerElement.className = "book-container";
  textContainer.className = "text-container";
  buttonContainer.className = "button-container";
  deleteElement.className = "delete-button";
  readButton.className = "read-button";

  titleElement.textContent = book.title;
  authorElement.textContent = `Written by ${book.author}`;
  infoElement.textContent = book.info();
  deleteElement.textContent = "Delete";
  readButton.textContent = "Toggle Read";

  containerElement.appendChild(imageElement);
  textContainer.appendChild(titleElement);
  textContainer.appendChild(authorElement);
  textContainer.appendChild(infoElement);
  containerElement.appendChild(textContainer);
  buttonContainer.appendChild(deleteElement);
  buttonContainer.appendChild(readButton);
  containerElement.appendChild(buttonContainer);
  bookDisplay.appendChild(containerElement);

  deleteElement.addEventListener("click", () => {
    bookDisplay.removeChild(containerElement);
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
  });

  readButton.addEventListener("click", () => {
    book.toggleRead();
    infoElement.textContent = book.info();
  });
}

function createImageElement(imageURL) {
  const imageContainer = document.createElement("div");
  imageContainer.className = "book-image";

  if (imageURL) {
    const image = document.createElement("img");
    image.src = imageURL;
    image.className = "image-item";
    imageContainer.appendChild(image);
    return imageContainer;
  } else {
    const svg = bookTemplate.cloneNode(true);
    imageContainer.style.color = createRandomColor();
    imageContainer.appendChild(svg);
    return imageContainer;
  }
}

function createRandomColor() {
  return `rgb(${randomNumber(0, 256)}, ${randomNumber(0, 256)}, ${randomNumber(
    0,
    256
  )})`;
}

function randomNumber(from, to) {
  let range = to - from;
  return Math.floor(Math.random() * range) + from;
}

seedLibrary();
displayBooks();
