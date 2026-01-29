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
  const list = [];
  for (let i = 1; i <= 30; i++) {
    list.push({
      id: Date.now() + i,
      title: `Sample Movie ${i}`,
      director: `Director ${i}`,
      year: 1990 + (i % 30),
      rating: (i % 10) + 1
    });
  }
  return list;
}