const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const mongoose = require('mongoose');


const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));

// ...
// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post('/recipes', (req, res) => {
    const newRecipe = req.body;
    Recipe.create(newRecipe)
        .then((recipe) => res.status(201).json({ data: recipe }))
        .catch((err) => res.status(500).json({ message: "Error" }))
})
//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', (req, res) => {
    const newRecipe = req.body;
    Recipe.find(newRecipe)
        .then((recipe) => res.status(200).json(recipe))
        .catch((err) => res.status(500).json({ message: "Error" }))
})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', (req, res) => {
    const { id } = req.params;

    Recipe.findById(id)
        .then((recipe) => res.status(200).json(recipe))
        .catch((err) => res.status(500).json({ message: "Error" }))
})

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', (req, res) => {
    const { id } = req.params;
    const newRecipe = req.body;
    Recipe.findByIdAndUpdate(id, newRecipe, { new: true })
        .then((recipe) => res.status(200).json(recipe))
        .catch((err) => res.status(500).json({ message: "Error" }))
})

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete('/recipes/:id', (req, res) => {
    const { id } = req.params;

    Recipe.findByIdAndDelete(id)
        .then(() => res.sendStatus(404))
        .catch((err) => res.status(500).json({ message: "Error" }))
})

// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
