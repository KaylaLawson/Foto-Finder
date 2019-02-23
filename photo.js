class Photo {
  constructor(id, file, title, caption, favorite) {
    this.id = id;
    this.file = file;
    this.title = title;
    this.caption = caption;
    this.favorite = favorite || false;
  }

  saveToStorage(imagesArr) {
    localStorage.setItem('imagesArr', JSON.stringify(imagesArr));
    // var stringified = JSON.stringify(imagesArr);
    // localStorage.setItem("stringifiedIdeas", stringified);
  }

  deleteFromStorage(index) {
   imagesArr.splice(index, 1);
   this.saveToStorage(imagesArr);
  }

  updatePhoto() {
    
    
  }
}