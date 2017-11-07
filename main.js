const baseURL = 'http://localhost:3000/games'
let gameRow = document.querySelector('.game-row')


function editGameView(title, image, description, designers, year, rating, id, baseURL) {
  return `    <div class="col-lg-6 col-md-12 col-sm-12">
        <img class="wide" src="${image}" alt="game">
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="col single-view mb-5" data-id="1">
          <form>
            <label for="image">Image URL:</label>
            <input type="text" name="image" value="${image}" id="image-input"></input>

            <label for="title" class="mt-3">Title:</label>
            <input type="text" name="title" value="${title}" id="title-input"></input>

            <label for="rating" class="mt-3">Rating:</label>
            <div class="rating">
              <input type="text" name="rating" value="${rating}" id="rating-input"></input>
            </div>

            <label for="description" class="mt-3">Description:</label>
            <textarea name="description" value="this will be dynamic" rows="4" id="description-area">${description}</textarea>

            <label for="designers" class="mt-3">Designer(s):</label>
            <input type="text" name="designers" value="${designers}" id="designer-input"></input>

            <label for="year" class="mt-3">Year published:</label>
            <input type="text" name="year" value="${year}" id="year-input"></input>
          </form>
          <div class="save-cancel-links mt-4">
            <a href="#" class="cancel-link">Cancel</a>
            <a href="#" class="save-link text-success">Save</a>
          </div>
        </div>
      </div>`
}



function renderOneGame(title, image, description, designers, year, rating, id, baseURL) {

  gameRow.innerHTML = oneGame(title, image, description, designers, year, rating, id, baseURL)

  //event listener to swap in edit view
  let editLink = document.querySelector('.edit-link')
  editLink.addEventListener('click', (e) => {
    updateGame(title, image, description, designers, year, rating, id, baseURL)
  })
  //event listener for delete
}

function updateGame(title, image, description, designers, year, rating, id, baseURL) {
  //load edit view
  gameRow.innerHTML = editGameView(title, image, description, designers, year, rating, id, baseURL)

  let saveLink = document.querySelector('.save-link')
  saveLink.addEventListener('click', (e) => {
    let newImage = document.querySelector('#image-input').value
    let newTitle = document.querySelector('#title-input').value
    let newRating =
    document.querySelector('#rating-input').value
    let newDescription =
    document.querySelector('#description-area').value
    let newDesigners = document.querySelector('#designer-input').value
    let newYear = document.querySelector('#year-input').value

    axios.put(`${baseURL}/${id}`, {title: newTitle, image: newImage, rating: newRating, description: newDescription, designers: newDesigners, year: newYear})
      .then(result => {
        console.log(result.data);
        const {title, image, rating, description, designers, year} = result.data
        renderOneGame(title, image, description, designers, year, rating, id, baseURL)
      })
      .catch(errors => {
        console.log(errors);
      })
  })
  //event listener for save.. axios.PUT
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
            if (e.target.matches(".game-link")) {
              let thisGame = result.data[i]
              renderOneGame(thisGame.title, thisGame.image, thisGame.description, thisGame.designers, thisGame.year, thisGame.rating, thisGame.id, baseURL)
            }
          })
        }

      }
    })
}
loadGames(baseURL)
