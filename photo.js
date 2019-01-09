class Photo {
  constructor(id, file, title, caption, favorite) {
    this.id = id;
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false;
  }

  saveToStorage() {
    localStorage.setItem('imagesArrlocal', JSON.stringify(imagesArr));
  }

  deleteFromStorage() {
    var selectedCardIndex = imagesArr.findIndex(function(photo) {
    return photo.id === selectedCardIndex;
  });
    imagesArr.splice(selectedCardIndex, 1);
    this.saveToStorage(imagesArr);
  }

  updatePhoto() {
    
  }
}