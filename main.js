// GLOBAL VARIABLES

var photoFile = document.querySelector('.choose-file-btn');
var createAlbum = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.album-wrapper');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();
var title = document.querySelector('.title-input');
var caption = document.querySelector('.caption-input');
var searchInput = document.querySelector('.search-input');
var albumWrapper = document.querySelector('.album-wrapper');


// EVENT LISTENERS

window.addEventListener('load', appendPhotos(imagesArr));
createAlbum.addEventListener('click', albumCard);
searchInput.addEventListener('input', liveSearchFilter);
albumWrapper.addEventListener('change', manipulateCard);
albumWrapper.addEventListener('keydown', saveOnReturn);
albumWrapper.addEventListener('focusout', saveCardAgain);

// FUNCTIONS

function populateCard(newObject) {
  var card = `
  <section class="foto-card-container" data-id=${newObject.id}>
    <h2 class="foto-title" contenteditable="true">${newObject.title}</h2>
    <article class="foto-image"><img src=${newObject.file} /></article>
    <h2 class="foto-caption" contenteditable="true">${newObject.caption}</h2>
    <article class="foto-card-footer">
      <img class="trash-icon" src="assets/delete.svg">
      <img class="trash-icon" src="assets/delete-active.svg">

      <img class="heart-icon" src="assets/favorite.svg">
    </article>
  </section>
  `;
  albumWrapper.insertAdjacentHTML('afterbegin', card);
}

function albumCard(event) {
  event.preventDefault();
  if (photoFile.files[0]) {
    reader.readAsDataURL(photoFile.files[0]); 
    reader.onload = addFotoCard
  }
}

function addFotoCard(event) {
  var newPhoto = new Photo(Date.now(), event.target.result, title.value, caption.value);
  populateCard(newPhoto);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  title.value = "";
  caption.value = "";
}

function appendPhotos(oldCards) {
  imagesArr = []
  oldCards.forEach(function(photo) {
    imagesArr.push(new Photo (photo.id, photo.file, photo.title, photo.caption));
    populateCard(photo);
    });
}

function manipulateCard(event) {
  if (event.target.classList.contains('trash-icon')) {
    deleteCard(event);
  } else if (event.target.classList.contains('heart-icon')) {
    isFavorite(event);
  } 
}

function saveOnReturn(event) {
  if (event.keyCode === 13){
    event.preventDefault();
    saveCardAgain(event);
    event.target.blur();
  } 
}

function saveCardAgain(event) {
  var selectedCard = parseInt(event.target.closest('.foto-card-container').dataset.id);
  var cardText = event.target.innerText;
  var category = event.target.classList.contains('foto-title') ? 'title' : 'caption' ;
    imagesArr.forEach(function(image){
      if (image.id === selectedCard) {
        image.updatePhoto(cardText, category);
    }
  });
}

function deleteCard() {
  var selectedCard = event.target.closest('.foto-card-container');
  var selectedCardId = parseInt(selectedCard.dataset.id);
  var index = imagesArr.findIndex(function(photo) {
    return photo.id === selectedCardId;
  });
  imagesArr[index].deleteFromStorage(index);
  selectedCard.remove();
}

function liveSearchFilter () {
  photoGallery.innerHTML = '';
  var searchCurrentText = searchInput.value;
  var filteredCards = imagesArr.filter(function(photo) {
    return photo.title.includes(searchCurrentText) || photo.caption.includes(searchCurrentText)
  });
  filteredCards.forEach(function(photo) {
  populateCard(photo.id, photo.file, photo.title, photo.caption);
  });
}