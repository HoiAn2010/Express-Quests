//ce sont les import
require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

// on modifie la valeur de la variable port initialement 5000
const port = process.env.APP_PORT ?? 5000;

//
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// movies 
// -> la fonction handler
const movieHandlers = require("./movieHandlers");

// -> les routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

//users
// -> la fonction handler
const userHandlers = require("./userHandlers");
//middleware de hashage pour mot de passe
const { hashPassword } = require("./auth.js");

//-> les routes
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);
app.post("/api/users", hashPassword, userHandlers.postUser);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
