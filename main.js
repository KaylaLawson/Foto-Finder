// GLOBAL VARIABLES

var photoFile = document.querySelector('.choose-file-btn');
var createAlbum = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.album-wrapper');
var imagesArr = JSON.parse(localStorage.getItem('imagesArr')) || [];
var reader = new FileReader();
var title = document.querySelector('.title-input');
var caption = document.querySelector('.caption-input');

// EVENT LISTENERS

window.addEventListener('load', appendPhotos);
createAlbum.addEventListener('click', albumCard);

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
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  var newPhoto = new Photo(Date.now(), e.target.result, title.value, caption.value);
  populateCard(newPhoto.photoId, newPhoto.file, newPhoto.title, newPhoto.caption);
  imagesArr.push(newPhoto);
  newPhoto.saveToStorage(imagesArr);
}
  
  // add favoiret later
  // photoGallery.innerHTML += 
  // `
  // <section class="foto-card-container">
  //   <h2 class="foto-title" contenteditable="true">${title.value}</h2>
  //   <article class="foto-image"><img src=${e.target.result} /></article>
  //   <h2 class="foto-caption" contenteditable="true">${caption.value}</h2>
  //   <article class="foto-card-footer">
  //     <img class="trash-icon" src="assets/delete.svg">
  //     <img calss="heart-icon" src="assets/favorite.svg">
  //   </article>
  // </section>
  // `;


function appendPhotos() {
  imagesArr.forEach(function (photo) {
    populateCard(photo.id, photo.file, photo.title, photo.caption);
    });
}
    // photoGallery.innerHTML += 
      // `<section class="foto-card-container">
      //   <h2 class="foto-title" contenteditable="true">${photo.title}</h2>
      //   <article class="foto-image"><img src=${photo.file} /></article>
      //   <h2 class="foto-caption" contenteditable="true">${photo.caption}</h2>
      //   <article class="foto-card-footer">
      //     <img class="trash-icon" src="assets/delete.svg">
      //     <img calss="heart-icon" src="assets/favorite.svg">
      //   </article>
      // </section>`;
