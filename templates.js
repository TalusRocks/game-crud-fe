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
