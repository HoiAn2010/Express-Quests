//ce sont les import
require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

// on modifie la valeur de la variable port initialement 5000
const port = process.env.APP_PORT ?? 5000;

//import movies
const movieHandlers = require("./movieHandlers");

//import users
const userHandlers = require("./userHandlers");

//middleware de hashage pour mot de passe
const { hashPassword, verifyPassword , verifyToken} = require("./auth");
//const { verify } = require("argon2");


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};


app.get("/", welcome);
// route login
app.post("/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext, verifyPassword);

// routes movies
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

//routes users
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUsersById);

// route post users
app.post("/api/users", hashPassword, userHandlers.postUser);

// authentification avec JWT
app.use(verifyToken);

// -> les routes movies
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

//-> les routes users
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

/*require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5000;
const userHandlers = require("./userHandlers");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const movieHandlers = require("./movieHandlers");


const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.post( "/api/login", userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// const { validateMovie } = require("./validators.js");
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


app.post("/api/users", hashPassword, userHandlers.postUser);

app.use(verifyToken);

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

//const { validateUser } = require("./validators.js");


app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log("Server is listening");
  }
});*/
