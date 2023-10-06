const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
    { id: 1, genre: "action" },
    { id: 2, genre: "comedy" },
    { id: 3, genre: "drama" },
    { id: 4, genre: "horror" },
  ];

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
router.get("/", (req, res) => {
    res.send(genres);
  });
  
  router.get("/:id", (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send("Genre not found");
    res.send(genre);
  });
  
  // --------------------- POST ---------------------
  router.post("/", (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = {
      id: genres.length + 1,
      genre: req.body.genre,
    };
    genres.push(genre);
    res.send(genre);
  });
  
  // --------------------- PUT ---------------------
  router.put("/:id", (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send("Genre not found");
    const { error } = validateGenre(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    genre.genre = req.body.genre;
    res.send(genre);
  });
  
  // --------------------- DELETE ---------------------
  router.delete("/:id", (req, res) => {
    const genre = findGenre(req.params.id);
    if (!genre) return res.status(404).send("Genre not found");
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
  });

  module.exports = router;