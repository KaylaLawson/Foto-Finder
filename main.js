var createAlbum = document.querySelector('.add-to-album-btn');
var photoFile = document.querySelector('.choose-file-btn');
var photoGallery = document.querySelector('.images');
var imagesArr = JSON.parse(localStorage.getItem('photos')) || [];
var reader = new FileReader();

window.addEventListener('load', appendPhotos);
createAlbum.addEventListener('click', albumCard);

function appendPhotos() {
  imagesArr.forEach(function (photo) {
    photoGallery.innerHTML += `<img src=${photo.file} />`
  })
}

function albumCard(event) {
  event.preventDefault();
  if (photoFile.files[0]) {
    reader.readAsDataURL(photoFile.files[0]); 
    reader.onload = addPhoto
  }
}

function addPhoto(e) {
  // console.log(e.target.result);
  var newPhoto = new Photo(Date.now(), e.target.result);
  photoGallery.innerHTML += `<img src=${e.target.result} />`;
  imagesArr.push(newPhoto)
  newPhoto.saveToStorage(imagesArr)
}

var photoInput = document.querySelector('.choose-file-btn');
