const baseURL = 'http://localhost:3000/games'
let gameRow = document.querySelector('.game-row')

//////////LOAD ALL
function loadGames(baseURL) {
  axios.get(baseURL)
    .then(result => {
      let games = result.data
      for (let i in games) {
        let title = games[i].title
        let description = games[i].description
        let image = games[i].image
        let designers = games[i].designers
        let year = games[i].year
        let rating = games[i].rating
        let id = games[i].id
        gameRow.innerHTML += makeGame(title, image, description, designers, year, rating, id)

        //event listener to swap in one-page view
        let gameLinks = document.querySelectorAll('.one-game')
        for (let i = 0; i < gameLinks.length; i++) {
          gameLinks[i].addEventListener('click', function(e) {
            if (e.target.matches('.game-link')) {
              let thisGame = result.data[i]
              renderOneGame(thisGame.title, thisGame.image, thisGame.description, thisGame.designers, thisGame.year, thisGame.rating, thisGame.id, baseURL)
            }
          })
        }

      }
    })
    .catch(errors => {
      console.log(errors, "in get all");
    })
}
loadGames(baseURL)

//////////LOAD ONE
function renderOneGame(title, image, description, designers, year, rating, id, baseURL) {

  gameRow.innerHTML = oneGame(title, image, description, designers, year, rating, id, baseURL)

  //event listener for edit view
  let editLink = document.querySelector('.edit-link')
  editLink.addEventListener('click', (e) => {
    updateGame(title, image, description, designers, year, rating, id, baseURL)
  })

  //event listener to delete
  let deleteLink = document.querySelector('.delete-link')
  deleteLink.addEventListener('click', (e) => {
    let id = e.srcElement.getAttribute('data-id')
    deleteGame(id)
  })
}

//////////CREATE
let addGame = document.querySelectorAll('.add-game')
for (let j = 0; j < addGame.length; j++) {
  addGame[j].addEventListener('click', (e) => {
    //render ADD view
    createGame()
  })
}

function createGame() {
  gameRow.innerHTML = createGameView()

  //save listener --> UPDATE
  let saveLink = document.querySelector('.save-link')
  saveLink.addEventListener('click', (e) => {

    let newImage = document.querySelector('#image-input').value
    let newTitle = document.querySelector('#title-input').value
    let newRating = document.querySelector('#rating-input').value
    let newDescription = document.querySelector('#description-area').value
    let newDesigners = document.querySelector('#designer-input').value
    let newYear = document.querySelector('#year-input').value


    let imageLabel = document.querySelector('label[for="image"]')
    if (newImage) imageLabel.innerHTML = `<span class="text-danger">*</span>Image URL:`

    let titleLabel = document.querySelector('label[for="title"]')
    if (newTitle) titleLabel.innerHTML = `<span class="text-danger">*</span>Title:`

    let ratingLabel = document.querySelector('label[for="rating"]')
    if (newRating) ratingLabel.innerHTML = `<span class="text-danger">*</span>Rating:`

    let designersLabel = document.querySelector('label[for="designers"]')
    if (newDesigners) designersLabel.innerHTML = `<span class="text-danger">*</span>Designer(s):`

    let yearLabel = document.querySelector('label[for="year"]')
    if (newYear) yearLabel.innerHTML = `<span class="text-danger">*</span>Year published:`


    axios.post(baseURL, {title: newTitle, image: newImage, rating: newRating, description: newDescription, designers: newDesigners, year: newYear, id:""})
      .then(result => {
        const {title, image, rating, description, designers, year, id} = result.data

        renderOneGame(title, image, description, designers, year, rating, id, baseURL)
      })
      .catch(errors => {
        if (!newImage){
          let errorMessage = `<p class="text-danger">Please enter an image URL</p>`
          imageLabel.innerHTML = errorMessage
        }
        if (!newTitle){
          let errorMessage = `<p class="text-danger">Please enter a title</p>`
          titleLabel.innerHTML = errorMessage
        }
        if (!newRating){
          let errorMessage = `<p class="text-danger">Please enter a rating</p>`
          ratingLabel.innerHTML = errorMessage
        }
        if (!newDesigners){
          let errorMessage = `<p class="text-danger">Please enter designer name(s)</p>`
          designersLabel.innerHTML = errorMessage
        }
        if (!newYear){
          let errorMessage = `<p class="text-danger">Please enter year published</p>`
          yearLabel.innerHTML = errorMessage
        }
        console.log(errors);
      })
  })

  //cancel listener
  let cancelLink = document.querySelector('.cancel-link')
  cancelLink.addEventListener('click', (e) => {
    gameRow.innerHTML = ""
    loadGames(baseURL)
  })

}

//////////UPDATE
function updateGame(title, image, description, designers, year, rating, id, baseURL) {
  //load edit view
  gameRow.innerHTML = editGameView(title, image, description, designers, year, rating, id, baseURL)

  //cancel listener
  let cancelLink = document.querySelector('.cancel-link')
  cancelLink.addEventListener('click', (e) => {
    renderOneGame(title, image, description, designers, year, rating, id, baseURL)
  })

  //save listener --> UPDATE
  let saveLink = document.querySelector('.save-link')
  saveLink.addEventListener('click', (e) => {
    let newImage = document.querySelector('#image-input').value
    let newTitle = document.querySelector('#title-input').value
    let newRating = document.querySelector('#rating-input').value
    let newDescription = document.querySelector('#description-area').value
    let newDesigners = document.querySelector('#designer-input').value
    let newYear = document.querySelector('#year-input').value

    axios.put(`${baseURL}/${id}`, {title: newTitle, image: newImage, rating: newRating, description: newDescription, designers: newDesigners, year: newYear})
      .then(result => {
        const {title, image, rating, description, designers, year} = result.data
        renderOneGame(title, image, description, designers, year, rating, id, baseURL)
      })
      .catch(errors => {
        console.log(errors, "in put");
      })
  })
}

//////////DELETE
function deleteGame(id) {
  axios.delete(`${baseURL}/${id}`)
    .then(result => {
      gameRow.innerHTML = ""
      loadGames(baseURL)
    })
    .catch(errors => {
      console.log(errors, "in delete");
    })
}

//////////HOME
let brandHome = document.querySelector('.navbar-brand')
brandHome.addEventListener('click', (e) => {
  gameRow.innerHTML = ""
  loadGames(baseURL)
})
