class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = Date.now();
    this.title = title;
    this.file =file;
    this.favorite = favorite || false;
  }

  saveToStorage() {
    
  }

  deleteFromStorage() {

  }

  updatePhoto() {
    
  }

}