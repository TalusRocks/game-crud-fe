const baseURL = 'http://localhost:3000/games'

let gameRow = document.querySelector('.game-row')

function makeGame(title, image, description, designers, year, rating, id) {
  return `<div class="col one-game" data-id="${id}">
          <div class="card" style="width: 20rem;">
            <img class="card-img-top game-link" src="${image}" alt="${title} game" data-id="${id}">
            <div class="card-body">
              <h4><a class="game-link" href="#" data-id="${id}">${title}</a></h4>
            </div>
            <div class="rating">
              <p>${rating}</p>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">${description}</li>
              <li class="list-group-item">Designer(s): ${designers}</li>
              <li class="list-group-item">Year: ${year}</li>
            </ul>
          </div>
        </div>`
}

function oneGame(title, image, description, designers, year, rating, id, baseURL) {
  return `    <div class="col-lg-6 col-md-12 col-sm-12">
      <img class="wide" src="${image}" alt="${title} game">
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="col single-view mb-5" data-id="${id}">
          <h1 class="text-center mb-4"><a href="${baseURL}/${id}">${title}</a></h1>
          <div class="rating">
            <p>10</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${description}</li>
            <li class="list-group-item">Designer(s): ${designers}</li>
            <li class="list-group-item">Year: ${year}</li>
            <li class="list-group-item edit-delete-links">
              <a href="#" class="delete-link text-danger">Delete</a>
              <a href="#" class="edit-link">Edit</a>
            </li>
          </ul>
        </div>
      </div> `
}

function renderOneGame(title, image, description, designers, year, rating, id, baseURL) {

  gameRow.innerHTML = oneGame(title, image, description, designers, year, rating, id, baseURL)

  //event listener to swap in edit view
  let editGame = document.querySelector('.edit-link')
  editGame.addEventListener('click', (e) => {
    console.log("clicky");
  })
  //event listener for delete
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
//loadGames(baseURL)
