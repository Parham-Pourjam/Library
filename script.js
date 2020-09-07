let myLibrary = [];


const cardContainer = document.querySelector('.card-container');

function Book(title, author, pages, read) {
  // the constructor...
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
  // do stuff here
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    return book;
}

addBookToLibrary("Bleach", "Tite Kubo", 200, true);
//addBookToLibrary("Naruto", "Ichigo", 300, false);

//myLibrary[0].read = true;
//console.log(myLibrary[0].info());

function cardCreator() {
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.lastChild);
    }

    for (let i = 0; i < myLibrary.length; i++) {
      const card = document.createElement('div');
      card.className = "card";
      const titleComponent = document.createElement('h3');
      const authorComponent = document.createElement('h5');
      const pagesComponent = document.createElement('h6');
      const readStatus = document.createElement('h6');

      titleComponent.textContent = myLibrary[i].title; 
      authorComponent.textContent = `By: ${myLibrary[i].author}`;
      pagesComponent.textContent = myLibrary[i].pages + " pages";
      readStatus.textContent = myLibrary[i].read;

      card.appendChild(titleComponent);
      card.appendChild(authorComponent);
      card.appendChild(pagesComponent);
      card.appendChild(readStatus);

      // give each card a data attribute representing the index to help with removal of cards
      card.setAttribute('data-index', i);

      // create removal button and append to card
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
  // display form
  
  title = document.getElementById('title').value;
  author = document.getElementById('author').value;
  pages = document.getElementById('pages').value;
  read = document.getElementById('read').value;
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
  document.getElementById('read').value = "";
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
