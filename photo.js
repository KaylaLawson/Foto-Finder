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

  updatePhoto(newText, change) {
    this[change] = newText; 
    if (event.target.classList.contains('heart-icon')) {
      this.favorite = !this.favorite;  
    }
      this.saveToStorage(imagesArr);
  }

}