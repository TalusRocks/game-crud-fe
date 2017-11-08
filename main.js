const baseURL = 'http://localhost:3000/games'
let gameRow = document.querySelector('.game-row')


function renderOneGame(title, image, description, designers, year, rating, id, baseURL) {

  gameRow.innerHTML = oneGame(title, image, description, designers, year, rating, id, baseURL)

  //event listener to swap in edit view
  let editLink = document.querySelector('.edit-link')
  editLink.addEventListener('click', (e) => {
    updateGame(title, image, description, designers, year, rating, id, baseURL)
  })

  //event listener for delete
  let deleteLink = document.querySelector('.delete-link')
  deleteLink.addEventListener('click', (e) => {
    let id = e.srcElement.getAttribute('data-id')
    deleteGame(id)
  })
}

function deleteGame(id) {
  axios.delete(`${baseURL}/${id}`)
    .then(result => {
      gameRow.innerHTML = ""
      loadGames(baseURL)
    })
}

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
        console.log(errors);
      })
  })
}

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
}
loadGames(baseURL)

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

    axios.post(baseURL, {title: newTitle, image: newImage, rating: newRating, description: newDescription, designers: newDesigners, year: newYear, id:""})
      .then(result => {
        const {title, image, rating, description, designers, year, id} = result.data

        renderOneGame(title, image, description, designers, year, rating, id, baseURL)
      })
  })

  //cancel listener
  let cancelLink = document.querySelector('.cancel-link')
  cancelLink.addEventListener('click', (e) => {
    gameRow.innerHTML = ""
    loadGames(baseURL)
  })

}
