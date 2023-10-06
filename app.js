// --------------------- Imports ---------------------
const Joi = require("joi");
const express = require("express");
require("dotenv").config();

// --------------------- Initializing ---------------------
const app = express();
app.use(express.json());

const genres = [
  { id: 1, genre: "action" },
  { id: 2, genre: "comedy" },
  { id: 3, genre: "drama" },
  { id: 4, genre: "horror" },
];
// --------------------- Functions ---------------------
function findGenre(id) {
  return genres.find((g) => g.id === parseInt(id));
}

function validateGenre(genre) {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
  });
  return schema.validate(genre);
}

// --------------------- GET ---------------------
app.get("/", (req, res) => {
  res.send("Welcome to Vidly!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  res.send(genre);
});

// --------------------- POST ---------------------
app.post("/api/genres", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  genres.push(genre);
  res.send(genre);
});

// --------------------- PUT ---------------------
app.put("/api/genres/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  const { error } = validateGenre(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  genre.genre = req.body.genre;
  res.send(genre);
});

// --------------------- DELETE ---------------------
app.delete("/api/genres/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

// --------------------- SETTING PORT ---------------------
const PORT = process.env.PORT || 3000;
console.log(`Listening on port ${PORT}...`);
app.listen(PORT);
