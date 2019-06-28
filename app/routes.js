const mongojs = require("mongojs");

// Database configuration
// ===================================================================
// Save the URL of our database as well as the name of our collection
const databaseUrl = "creepyscraper";
const collections = ["scrapedData"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function(error) {
  console.log("Database Error:", error);
});



module.exports = function (app) {

    /*--- Main Route ---*/
    app.get("/", function (req, res) {
        res.render("index")
    });

    /*--- Find Everything ---*/
    app.get("/all", function (req, res) {
        db.scrapedData.find({}, function (error, found) {
            if (error) {
                console.log(error);
            } else {
                res.json(found);
            }
        });
    });

    /*--- Scrape ---*/
}