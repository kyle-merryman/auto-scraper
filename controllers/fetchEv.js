// Controller for our Event scraper
// ============================
var db = require("../models");
var scrapeEv = require("../scripts/scrapeEv");

module.exports = {
  scrapeEvents: function(req, res) {

    console.log("hit scrapeEvents");
          // scrape the NYT
    return scrapeEv().then(function(events) {
    console.log("...INSERTING Events into db");
      // then insert articles into the db
      return db.Event.create(events);
    })
    .then(function(dbEvent) {
        // console.log("SUCCESSFULLY INSERTED EVENT INTO DB");
      if (dbEvent.length === 0) {
        // console.log("No |" + dbEvent.length + "| new events!");
      }
      else {
        // Otherwise send back a count of how many new articles we got

        // console.log("Added " + dbEvent.length + " new events!");
      }
    })
    .catch(function(err) {
      // This query won't insert articles with duplicate headlines, but it will error after inserting the others

    });
  }
};