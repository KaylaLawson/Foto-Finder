 // Notes from class for creat function


function createElement() {
    console.log(input.files[0])
  if(input.files[0]) {
    reader.readAsDataURL(input.files[0]);
    // reader.onload = addPhoto
  }
}