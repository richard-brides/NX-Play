const API_BASE = "http://localhost:3000";

const SCROLL_DISTANCE = 700;

function scrollCarousel(direction) {
    const carousel = document.getElementById("carousel");
    
    const newScrollPosition = carousel.scrollLeft + (direction * SCROLL_DISTANCE);
  
    carousel.scroll({
        left: newScrollPosition,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
 
    const scrollRightBtn = document.getElementById("scrollRightBtn");

    if (scrollRightBtn) {
        scrollRightBtn.addEventListener('click', () => {
            scrollCarousel(1); 
        });
    }
    const scrollLeftBtn = document.getElementById("scrollLeftBtn"); 
    
    if (scrollLeftBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            scrollCarousel(-1); 
        });
    }
})

async function loadMovies() {
  try {
    const res = await fetch(`${API_BASE}/movies`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const movies = await res.json();

    const carousel = document.getElementById("carousel");
    carousel.innerHTML = "";

    movies.forEach(movie => {
      const item = document.createElement("img");
      item.src = movie.cover;
      item.alt = movie.title;
      item.title = movie.title;
      item.onclick = () => window.location.href = `sinopse.html?id=${movie.id}`;
      carousel.appendChild(item);
    });
  } catch (err) {
    console.error("Erro ao carregar filmes:", err.message);
    const carousel = document.getElementById("carousel");
    if (carousel) carousel.innerHTML = "<p>Erro ao carregar filmes. Verifique o backend.</p>";
  }
}

async function loadMovie(id) {
  try {
    const res = await fetch(`${API_BASE}/movies/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const movie = await res.json();

    document.getElementById("movie").innerHTML = `
        <div class="dark-half">
          <div class="sinopse-container">
            <h1 class="movieTitle">${movie.title}</h1>
            <p class="movieDescription">${movie.description}</p>
            <div class="button-container">
              <button onclick="window.location.href='player.html?id=${movie.id}'">Assistir</button>
            </div>
          </div>
       </div>
       <div class="content"></div>
          <img class="movieImage" src="${movie.banner}" alt="${movie.title}">
      </div>
    `;
  } catch (err) {
    console.error("Erro loadMovie:", err.message);
    document.getElementById("movie").innerHTML = "<p>Filme não encontrado ou erro na API.</p>";
  }
}
