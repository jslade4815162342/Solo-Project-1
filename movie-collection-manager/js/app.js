const STORAGE_KEY = "movies";
let movies = [];
let editId = null;

// ---------- INITIAL LOAD ----------
movies = loadMovies();
renderList();
renderStats();

// ---------- STORAGE ----------
function loadMovies() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  } else {
    const starter = getStarterMovies();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starter));
    return starter;
  }
}

function saveMovies() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

// ---------- VIEWS ----------
function showView(view) {
  document.querySelectorAll(".view").forEach(v => v.classList.add("hidden"));
  document.getElementById(`${view}-view`).classList.remove("hidden");
}

function renderList() {
  const tbody = document.getElementById("movie-table");
  tbody.innerHTML = "";

  movies.forEach(movie => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.director}</td>
      <td>${movie.year}</td>
      <td>${movie.rating}</td>
      <td>
        <button onclick="editMovie(${movie.id})">Edit</button>
        <button onclick="deleteMovie(${movie.id})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });
}

function renderStats() {
  const statsDiv = document.getElementById("stats");
  const total = movies.length;
  const avg =
    movies.reduce((sum, m) => sum + m.rating, 0) / total;

  statsDiv.innerHTML = `
    <p><strong>Total Movies:</strong> ${total}</p>
    <p><strong>Average Rating:</strong> ${avg.toFixed(1)}</p>
  `;
}

// ---------- FORM ----------
document.getElementById("movie-form").addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const director = document.getElementById("director").value.trim();
  const year = Number(document.getElementById("year").value);
  const rating = Number(document.getElementById("rating").value);

  if (!title || !director) {
    alert("Title and Director are required.");
    return;
  }

  if (year < 1888 || year > new Date().getFullYear()) {
    alert("Enter a valid year.");
    return;
  }

  if (rating < 1 || rating > 10) {
    alert("Rating must be between 1 and 10.");
    return;
  }

  if (editId) {
    const movie = movies.find(m => m.id === editId);
    movie.title = title;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
  } else {
    movies.push({
      id: Date.now(),
      title,
      director,
      year,
      rating
    });
  }

  saveMovies();
  resetForm();
  renderList();
  renderStats();
  showView("list");
});

function editMovie(id) {
  const movie = movies.find(m => m.id === id);
  editId = id;

  document.getElementById("title").value = movie.title;
  document.getElementById("director").value = movie.director;
  document.getElementById("year").value = movie.year;
  document.getElementById("rating").value = movie.rating;

  document.getElementById("form-title").textContent = "Edit Movie";
  showView("form");
}

function resetForm() {
  editId = null;
  document.getElementById("movie-form").reset();
  document.getElementById("form-title").textContent = "Add Movie";
}

// ---------- DELETE ----------
function deleteMovie(id) {
  if (confirm("Are you sure you want to delete this movie?")) {
    movies = movies.filter(m => m.id !== id);
    saveMovies();
    renderList();
    renderStats();
  }
}

// ---------- STARTER DATA ----------
function getStarterMovies() {
  return [
    { id: 1, title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994, rating: 9},
    { id: 2, title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972, rating: 9},
    { id: 3, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008, rating: 9},
    { id: 4, title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994, rating: 8},
    { id: 5, title: 'Forrest Gump', director: 'Robert Zemeckis', year: 1994, rating: 8},
    { id: 6, title: 'Inception', director: 'Christopher Nolan', year: 2010, rating: 8},
    { id: 7, title: 'Fight Club', director: 'David Fincher', year: 1999, rating: 8},
    { id: 8, title: 'The Matrix', director: 'The Wachowskis', year: 1999, rating: 8},
    { id: 9, title: 'Goodfellas', director: 'Martin Scorsese', year: 1990, rating: 8},
    { id: 10, title: 'Se7en', director: 'David Fincher', year: 1995, rating: 8},
    { id: 11, title: 'Interstellar', director: 'Christopher Nolan', year: 2014, rating: 8},
    { id: 12, title: 'Parasite', director: 'Bong Joon-ho', year: 2019, rating: 8},
    { id: 13, title: 'The Green Mile', director: 'Frank Darabont', year: 1999, rating: 8},
    { id: 14, title: 'Gladiator', director: 'Ridley Scott', year: 2000, rating: 8},
    { id: 15, title: 'The Lion King', director: 'Roger Allers', year: 1994, rating: 8},
    { id: 16, title: 'Whiplash', director: 'Damien Chazelle', year: 2014, rating: 8},
    { id: 17, title: 'The Departed', director: 'Martin Scorsese', year: 2006, rating: 8},
    { id: 18, title: 'The Prestige', director: 'Christopher Nolan', year: 2006, rating: 8},
    { id: 19, title: 'Memento', director: 'Christopher Nolan', year: 2000, rating: 8},
    { id: 20, title: 'Alien', director: 'Ridley Scott', year: 1979, rating: 8},
    { id: 21, title: 'Apocalypse Now', director: 'Francis Ford Coppola', year: 1979, rating: 8},
    { id: 22, title: 'The Shining', director: 'Stanley Kubrick', year: 1980, rating: 8},
    { id: 23, title: 'Joker', director: 'Todd Phillips', year: 2019, rating: 8},
    { id: 24, title: 'Avengers: Endgame', director: 'Anthony Russo', year: 2019, rating: 8},
    { id: 25, title: 'Toy Story', director: 'John Lasseter', year: 1995, rating: 8},
    { id: 26, title: 'Braveheart', director: 'Mel Gibson', year: 1995, rating: 8},
    { id: 27, title: 'Amélie', director: 'Jean-Pierre Jeunet', year: 2001, rating: 8},
    { id: 28, title: 'A Clockwork Orange', director: 'Stanley Kubrick', year: 1971, rating: 8},
    { id: 29, title: 'Taxi Driver', director: 'Martin Scorsese', year: 1976, rating: 8},
    { id: 30, title: 'The Social Network', director: 'David Fincher', year: 2010, rating: 7}
  ];
}

