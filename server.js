const express = require("express");
const exphbs = require('express-handlebars');
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(logger("dev"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));

// Connect to database
mongoose.connect("mongodb://localhost/movienewsscraper", {
  useNewUrlParser: true
});

require("./controllers/routes")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});