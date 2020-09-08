let myLibrary = [];

const cardContainer = document.querySelector('.card-container');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function() {
    let readStatus = (this.read ? "has been read" : "not read yet"); 
    return `${this.name} by ${this.authorComponent}, ${this.pages} pages, ${readStatus}`;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

addBookToLibrary("Bleach", "Tite Kubo", 200, true);

function cardCreator() {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.lastChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {
      const card = document.createElement('div');
      card.className = "card";
      const titleComponent = document.createElement('h4');
      const authorComponent = document.createElement('h5');
      const pagesComponent = document.createElement('h6');
      const readComponent = document.createElement('h5');

      titleComponent.textContent = myLibrary[i].title; 
      authorComponent.textContent = `By: ${myLibrary[i].author}`;
      pagesComponent.textContent = myLibrary[i].pages + " pages";
      readComponent.textContent = readStatus(myLibrary[i].read);

      card.appendChild(titleComponent);
      card.appendChild(authorComponent);
      card.appendChild(readComponent);
      card.appendChild(pagesComponent);

      // give each card a data attribute representing the index to help with removal of cards
      card.setAttribute('data-index', i);

      // create removal button
      const removalButton = document.createElement('button');
      removalButton.classList.add('removal');
      card.appendChild(removalButton);

      // create button representing read status
      const readButtonElement = document.createElement('button');
      readButtonElement.classList.add('read-button');
      card.appendChild(readButtonElement);


      cardContainer.appendChild(card);

      removeButtonEventListener();
      readButtonEventListener();
    }
}

// changes read status symbol after button click
function readStatus(CurrentReadStatus) {
  if (CurrentReadStatus) {
    return "Read Status: 🗸";
  } else {
    return "Read Status: ⨂";
  }
}

// attach event listener to all remove buttons
function removeButtonEventListener() {
  const remove = document.querySelectorAll('.removal');
    remove.forEach(button => {
      button.addEventListener('click', removeCard);
    });
}

// attach event listener to all read button
function readButtonEventListener() {
  const readButtons = document.querySelectorAll('.read-button');
    readButtons.forEach(button => {
      button.addEventListener('click', changeReadStatus);
    });
}

// changes status of read property in array 
function changeReadStatus() {
  //console.log('ye');
  const index = this.parentNode.dataset.index;
  if (myLibrary[index].read) {
    myLibrary[index].read = false;
  } else {
    myLibrary[index].read = true;
  }
  
  cardCreator();
}

function addBook() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = readFormChoice();
  addBookToLibrary(title, author, pages, read);
  
  cardCreator();
  
  hideForm();

  clearFormElements();

  // update sessionStorage to reflect added books
  setSessionStorage();
}

function clearFormElements() {
  document.getElementById('title').value = "";
  document.getElementById('author').value = "";
  document.getElementById('pages').value = "";
  //document.getElementById('read').value = "";
}

// obtain reading status of book from forms radio buttons
function readFormChoice() {
  let selectedValue;

  const choices = document.querySelectorAll('input[name="read"]');

  for (const choice of choices) {
    if (choice.checked) {
      selectedValue = choice.value;
      break;
    }
  }

  if (selectedValue === "true") {
    return true;
  } else {
    return false;
  }
} 

// show form after 'add book' button is pressed
function showForm() {
  //document.querySelector('#form-element').style.display = 'block';
  let form = document.querySelector('.form-element');
  form.classList.add('new-form');
  form.classList.remove('form-element');
  //document.querySelector('card-container').setAttribute('style', 'display: none');
}

// hide form after book has been added
function hideForm() {
  let form = document.querySelector('.new-form');
  form.classList.add('form-element');
  form.classList.remove('new-form');
}

function removeCard() {
  const index = this.parentNode.dataset.index;
  myLibrary.splice(index, 1);
  // update session storage to reflect removed cards
  setSessionStorage();
  cardCreator();
}

function setSessionStorage() {
  sessionStorage.setItem("library", JSON.stringify(myLibrary));
}

// use sessionStorage to save library on reload
function onPageLoad() {
  if(sessionStorage.getItem('library')) {
    myLibrary = JSON.parse(sessionStorage.getItem('library'));
    cardCreator();
  } 
  else {
    addBookToLibrary("The Lord of the Rings", "J.R. Tolkien", "1523", true);
  }
}

const form = document.querySelector('#show-form');
form.addEventListener('click', showForm);

const submit = document.querySelector('#submit');
submit.addEventListener('click', addBook);

onPageLoad();
