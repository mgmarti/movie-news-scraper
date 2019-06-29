// Require request and cheerio. This makes the scraping possible
//====================================================================
const cheerio = require("cheerio");
const axios = require("axios");
const mongojs = require("mongojs");

// Database configuration
// ===================================================================
// Save the URL of our database as well as the name of our collection
const databaseUrl = "movienewsscraper";
const collections = ["scrapedData"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

// This makes sure that any errors are logged if mongodb runs into an issue
db.on("error", function (error) {
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
    app.get("/scrape", function (req, res) {
        const url = "https://screenrant.com/movie-news/"
        axios.get(url)
            .then(function (response) {

                // load response into cheerio by saving it as a variable
                const $ = cheerio.load(response.data);

                $(".bc-title").each(function (i, element) {

                    let title = $(this).children("a").text();
                    let summary = $(this).siblings(".bc-excerpt").text();
                    let link = $(this).children("a").attr("href");

                    // if title, summary, and link exist
                    if (title && summary && link) {
                        
                        //save into database
                        db.scrapedData.save({
                                title: title,
                                summary: summary,
                                link: link
                            },
                            function (error, saved) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(saved);
                                }
                            });
                            
                    }
                });


            })
            .catch(function (error) {
                console.log(error);
            });
        res.send("scrape complete")

    })
}