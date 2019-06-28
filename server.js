// Dependencies
// ===================================================================
const express = require("express");
const app = express();

const mongojs = require("mongojs");

// Require request and cheerio. This makes the scraping possible
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(express.static('public'));



//Routes
// =============================================================
require("./app/routes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});