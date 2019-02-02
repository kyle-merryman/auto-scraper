// Controller for our scraper
// ============================
var db = require("../models");
var scrapePet = require("../scripts/scrapePet");
var scrapeEv = require("../scripts/scrapeEv");

module.exports = {
  scrapePetitions: function(req, res) {
    console.log("hit scrapePetitions");
    // scrape the NYT
    return scrapePet()
      .then(function(articles) {
        // then insert articles into the db
        return db.Petition.create(articles);
      })
      .then(function(dbPetition) {
        if (dbPetition.length === 0) {
          res.json({
            message: "No new articles today. Check back tomorrow!"
          });
        }
        else {
          // Otherwise send back a count of how many new articles we got
          res.json({
            message: "Added " + dbPetition.length + " new articles!"
          });
        }
      })
      .catch(function(err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        res.json({
          message: "Petition Scrape complete!!"
        });
      });
  },

  scrapeEvents: function(req, res) {
    console.log("////////////// \n hit scrapeEvents \n ///////////////");
          // scrape the NYT
    return scrapeEv()
    .then(function(events) {
        console.log("...INSERTING into db");
      // then insert articles into the db
      return db.Event.create(events);
    })
    .then(function(dbEvent) {
        console.log("SUCCESSFULLY INSERTED EVENT INTO DB");
      if (dbEvent.length === 0) {
        res.json({
          message: "No new events today. Check back tomorrow!"
        });
        console.log("No |" + dbEvent.length + "| new events!");
      }
      else {
        // Otherwise send back a count of how many new articles we got
        res.json({
          message: "Added " + dbEvent.length + " new events!"
        });
        console.log("Added " + dbEvent.length + " new events!");
      }
    })
    .catch(function(err) {
      // This query won't insert articles with duplicate headlines, but it will error after inserting the others
      res.json({
        message: "Event Scrape complete!!"
      });
    });
  }
};