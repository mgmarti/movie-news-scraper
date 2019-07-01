// Dependencies
// ===================================================================
const express = require("express");
const exphbs = require('express-handlebars');
const app = express();


// Require request and cheerio. This makes the scraping possible
const cheerio = require("cheerio");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

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