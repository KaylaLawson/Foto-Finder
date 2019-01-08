class Photo {
  constructor(id, file, title, caption, favorite) {
    this.id = id || Date.now();
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false;
  }

  saveToStorage() {
    localStorage.setItem('imagesArr', JSON.stringify(imagesArr));
  }

  deleteFromStorage() {
    // localStorage.setItem('imagesArr', JSON.stringify(imagesArr));
  }

  updatePhoto() {
    
  }

}