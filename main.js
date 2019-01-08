// GLOBAL VARIABLES

var photoFile = document.querySelector('.choose-file-btn');
var createAlbum = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.album-wrapper');
var imagesArr = JSON.parse(localStorage.getItem('imagesArr')) || [];
var reader = new FileReader();
var title = document.querySelector('.title-input');
var caption = document.querySelector('.caption-input');
var searchInput = document.querySelector('.search-input');

// EVENT LISTENERS

window.addEventListener('load', appendPhotos);
createAlbum.addEventListener('click', albumCard);
searchInput.addEventListener('input', liveSearchFilter);

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
      <img calss="heart-icon" src="assets/favorite.svg">
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

function addFotoCard(event) {
  var newPhoto = new Photo(Date.now(), event.target.result, title.value, caption.value);
  populateCard(newPhoto.photoId, newPhoto.file, newPhoto.title, newPhoto.caption);
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

// function deleteCard(photoId) {
//   var card = imageArr.find(function(card) {
//     return card.id === photoId
//   })
//   // find the photo correct id of the photo we want to be deleted. We want to delete from the DOM as well in local storage. 
// }

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

