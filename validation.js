function validateForm(newImage, newTitle, newRating, newDesigners, newYear){
  let imageLabel = document.querySelector('label[for="image"]')
  if (newImage) {
    imageLabel.innerHTML = `<span class="text-danger">*</span>Image URL:`
  } else if (!newImage) {
    let errorMessage = `<p class="text-danger">Please enter an image URL</p>`
    imageLabel.innerHTML = errorMessage
  }

  let titleLabel = document.querySelector('label[for="title"]')
  if (newTitle) {
    titleLabel.innerHTML = `<span class="text-danger">*</span>Title:`
  } else if (!newTitle) {
    let errorMessage = `<p class="text-danger">Please enter a title</p>`
    titleLabel.innerHTML = errorMessage
  }

  let ratingLabel = document.querySelector('label[for="rating"]')
  if (newRating) {
    ratingLabel.innerHTML = `<span class="text-danger">*</span>Rating:`
  } else if (!newRating) {
    let errorMessage = `<p class="text-danger">Please enter a rating</p>`
    ratingLabel.innerHTML = errorMessage
  }

  let designersLabel = document.querySelector('label[for="designers"]')
  if (newDesigners) {
    designersLabel.innerHTML = `<span class="text-danger">*</span>Designer(s):`
  } else if (!newDesigners) {
    let errorMessage = `<p class="text-danger">Please enter designer name(s)</p>`
    designersLabel.innerHTML = errorMessage
  }

  let yearLabel = document.querySelector('label[for="year"]')
  if (newYear) {
    yearLabel.innerHTML = `<span class="text-danger">*</span>Year published:`
  } else if (!newYear) {
    let errorMessage = `<p class="text-danger">Please enter year published</p>`
    yearLabel.innerHTML = errorMessage
  }
}
