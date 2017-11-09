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
  return `    <div class="col-lg-6 col-md-12 col-sm-12 text-center">
      <img class="wide game-image mt-4" src="${image}" alt="${title} game">
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="col single-view mb-5" data-id="${id}">
          <h1 class="text-center mt-4 mb-4"><a href="${baseURL}/${id}">${title}</a></h1>
          <div class="rating">
            <p>${rating}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">${description}</li>
            <li class="list-group-item">Designer(s): ${designers}</li>
            <li class="list-group-item">Year: ${year}</li>
            <li class="list-group-item edit-delete-links">
              <a href="#" class="delete-link text-danger" data-id="${id}">Delete</a>
              <a href="#" class="edit-link">Edit</a>
            </li>
          </ul>
        </div>
      </div> `
}

function editGameView(title, image, description, designers, year, rating, id, baseURL) {
  return `    <div class="col-lg-6 col-md-12 col-sm-12 mb-3">
        <img class="wide" src="${image}" alt="game">
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12">
        <div class="col single-view mb-5" data-id="1">
          <form>
            <label for="image"><span class="text-danger">*</span>Image URL:</label>
            <input type="text" name="image" value="${image}" id="image-input" required></input>

            <label for="title" class="mt-3"><span class="text-danger">*</span>Title:</label>
            <input type="text" name="title" value="${title}" id="title-input" required></input>

            <label for="rating" class="mt-3"><span class="text-danger">*</span>Rating:</label>
            <div class="rating">
              <input type="text" name="rating" value="${rating}" id="rating-input" required></input>
            </div>

            <label for="description" class="mt-3">Description:</label>
            <textarea name="description" value="this will be dynamic" rows="4" id="description-area">${description}</textarea>

            <label for="designers" class="mt-3"><span class="text-danger">*</span>Designer(s):</label>
            <input type="text" name="designers" value="${designers}" id="designer-input" required></input>

            <label for="year" class="mt-3"><span class="text-danger">*</span>Year published:</label>
            <input type="text" name="year" value="${year}" id="year-input" required></input>
          </form>
          <div class="save-cancel-links mt-4">
            <a href="#" class="cancel-link text-secondary">Cancel</a>
            <a href="#" class="save-link text-success">Save</a>
          </div>
        </div>
      </div>`
}

function createGameView() {
  return `    <div class="col-lg-6 col-md-12 col-sm-12">
            <img class="wide" src="https://cf.geekdo-images.com/images/pic3742304_md.jpg" alt="game">
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="col single-view mb-5" data-id="1">
              <form>
                <label for="image"><span class="text-danger">*</span>Image URL:</label>
                <input type="text" name="image" id="image-input" required></input>

                <label for="title" class="mt-3"><span class="text-danger">*</span>Title:</label>
                <input type="text" name="title" id="title-input" required></input>

                <label for="rating" class="mt-3"><span class="text-danger">*</span>Rating:</label>
                <div class="rating">
                  <input type="text" name="rating" id="rating-input" required></input>
                </div>

                <label for="description" class="mt-3">Description:</label>
                <textarea name="description" rows="4" id="description-area"></textarea>

                <label for="designers" class="mt-3"><span class="text-danger">*</span>Designer(s):</label>
                <input type="text" name="designers"  id="designer-input" required></input>

                <label for="year" class="mt-3"><span class="text-danger">*</span>Year published:</label>
                <input type="text" name="year"  id="year-input" required></input>
              </form>
              <div class="save-cancel-links mt-4">
                <a href="#" class="cancel-link text-secondary">Cancel</a>
                <a href="#" class="save-link text-success">Save</a>
              </div>
            </div>
          </div>`
}
