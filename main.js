const baseURL = 'http://localhost:3000/games'

function makeGame(title, image, description, designers, artists, publishers, year, rating) {
  return `<div class="col">
          <div class="card" style="width: 20rem;">
            <img class="card-img-top" src="${image}" alt="${title} game">
            <div class="card-body">
              <h4 class="card-title">${title}</h4>
              <p class="card-text">${description}</p>
            </div>
            <div class="rating">
              <i class="fa fa-chevron-circle-left"></i>
              <p>${rating}</p>
              <i class="fa fa-chevron-circle-right"></i>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Designer(s): ${designers}</li>
              <li class="list-group-item">Artist(s): ${artists}</li>
              <li class="list-group-item">Publisher(s): ${publishers}</li>
              <li class="list-group-item">Year: ${year}</li>
            </ul>
            <div class="card-body">
              <a href="#" class="card-link">Edit</a>
            </div>
          </div>
        </div>`
}

axios.get(baseURL)
  .then(result => {
    let gameRow = document.querySelector('.game-row')
    let games = result.data
    for (var i in games) {
      let title = games[i].title
      let description = games[i].description
      let image = games[i].image
      let designers = games[i].designers
      let artists = games[i].artists
      let publishers = games[i].publishers
      let year = games[i].year
      let rating = games[i].rating
      gameRow.innerHTML += makeGame(title, image, description, designers, artists, publishers, year, rating)
    }
    // gameRow.innerHTML = `<p>Yas</p>`
  })
