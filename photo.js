class Photo {
  constructor(id, file, title, caption, favorite) {
    this.id = id;
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false;
  }

  saveToStorage(imagesArr) {
    localStorage.setItem('photos', JSON.stringify(imagesArr));
  }

  deleteFromStorage(index) {
   imagesArr.splice(index, 1);
   this.saveToStorage(imagesArr);
  }

  updatePhoto(newText, cats) {
    this[cats] = newText;
    this.saveToStorage(imagesArr);
  }
}