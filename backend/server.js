const express = require("express");
const fileSystem = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const moviesFilePath = path.join(__dirname, "movies.json");
const raw = fileSystem.readFileSync(moviesFilePath, "utf8");

let payload;

try {
  payload = JSON.parse(raw);
} catch (err) {
  console.error("Erro ao parsear o JSON", err.message);
  process.exit(1);
}

const moviesData = Array.isArray(payload.data) ? payload.data : (payload || []);

function sanitizeMovie(movie) {
  if (!movie) return null;

  return {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    banner: movie.banner,
    cover: movie.cover,
    hls: movie.hls
  };
}

app.get("/movies", (req, res) => {
  const movieslist = moviesData.map(sanitizeMovie);
  res.json(movieslist);
});

app.get("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = moviesData.find(movie => Number(movie.id) === id);

  if (!movie) {
    return res.status(404).json({ error: "Filme não encontrado" });
  }

  const movieDetails = sanitizeMovie(movie);
  res.json(movieDetails);
});

const PORT = 3000;
app.listen(PORT);

console.log(`API rodando na porta ${PORT}`);