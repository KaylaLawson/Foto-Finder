// GLOBAL VARIABLES

var photoFile = document.querySelector('.choose-file-btn');
var createAlbum = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.album-wrapper');
var imagesArr = JSON.parse(localStorage.getItem('imagesArrlocal')) || [];
var reader = new FileReader();
var title = document.querySelector('.title-input');
var caption = document.querySelector('.caption-input');
var searchInput = document.querySelector('.search-input');
var albumWrapper = document.querySelector('.album-wrapper');


// EVENT LISTENERS

window.addEventListener('load', appendPhotos);
createAlbum.addEventListener('click', albumCard);
searchInput.addEventListener('input', liveSearchFilter);
albumWrapper.addEventListener('click', manipulateCard);

// FUNCTIONS

function populateCard(photoId, file, title, caption) {
 photoGallery.innerHTML += 
  `
  <section class="foto-card-container" data-id=${photoId}>
    <h2 class="foto-title" contenteditable="true">${title}</h2>
    <article class="foto-image"><img src=${file} /></article>
    <h2 class="foto-caption" contenteditable="true">${caption}</h2>
    <article class="foto-card-footer">
      <img class="trash-icon" src="assets/delete.svg">
      <img class="heart-icon" src="assets/favorite.svg">
    </article>
  </section>
  `;
}

function albumCard(event) {
  event.preventDefault();
  if (photoFile.files[0]) {
    reader.readAsDataURL(photoFile.files[0]); 
    reader.onload = addFotoCard
  }
}

function manipulateCard(event) {
  if (event.target.classList.contains('trash-icon')) {
    deleteCard(event);
  } else if (event.target.classList.contains('heart-icon')) {
    isFavorite(event);
  } else if (event.target.classList.contains('foto-title' || 'foto-caption')) {
    editContent();
  }
}
function addFotoCard(event) {
  var newPhoto = new Photo(Date.now(), event.target.result, title.value, caption.value);
  populateCard(newPhoto.id, newPhoto.file, newPhoto.title, newPhoto.caption);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
  title.value = "";
  caption.value = "";
}

function appendPhotos() {
  imagesArr.forEach(function (photo) {
    populateCard(photo.id, photo.file, photo.title, photo.caption);
    });
}

function deleteCard(event) {
  var selectedCard = event.target.closest('.foto-card-container');
  console.log(selectedCard)
  var selectedCardId = parseInt(selectedCard.dataset.id);
  console.log(selectedCardId);
  var selectedCardIndex = imagesArr.findIndex(function(photo) {
    return photo.id === selectedCardId;
  });
    console.log(selectedCardIndex);
  imagesArr[selectedCardIndex].deleteFromStorage();
  selectedCard.remove();
}


function removeAllCards() {
  photoGallery.innerHTML = '';
}

function liveSearchFilter () {
  removeAllCards();
  var searchCurrentText = searchInput.value;
  var filteredCards = imagesArr.filter(function (photo) {
    return photo.title.includes(searchCurrentText) || photo.caption.includes(searchCurrentText)
  });
  filteredCards.forEach(function(photo) {
    populateCard(photo.id, photo.file, photo.title, photo.caption);
  });
}