const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

// Routes
module.exports = function (app) {
    //Main Path
    app.get("/", function (req, res) {

        res.render("home");
    });

    /*--- Scrape --- */
    app.get("/scrape", function (req, res) {
        const url = "https://screenrant.com/movie-news/";
        axios.get(url).then(function (response) {

            const $ = cheerio.load(response.data);

            $(".bc-title").each(function (i, element) {
                const result = {};

                result.title = $(this).children("a").text();
                result.summary = $(this).siblings(".bc-excerpt").text();
                result.link = $(this).children("a").attr("href");

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);

                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            });

            res.send("Scrape Complete");
        });
    });

    /*--- Find all ---*/
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {

                res.json(err);
            });
    });

}