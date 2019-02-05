// Controller for our Event scraper
// ============================
var db = require("../models");
var scrapeEv = require("../scripts/scrapeEv");

module.exports = {
  scrapeEvents: function(req, res) {
    //var allEvents = [];
    var keywords = ["climate-change", "military-veterans", "homeless"];
    
    for(i = 0; i < keywords.length; i++) {
    console.log("hit scrapeEvents");
    /*return*/ scrapeEv(keywords[i]).then(function(events) {
    console.log("...INSERTING Events into db");
      // then insert articles into the db
      //allEvents.push(events);
      // console.log(events);
      return db.Event.create(events);
    })
    .then(function(dbEvent) {

      console.log(`THIS IS THE ARRAY ALLEVENTS`);

      if (dbEvent.length === 0) {

      }
      else {
        
      }
    })
    .catch(function(err) {
      // This query won't insert articles with duplicate headlines, but it will error after inserting the others

    });
  } //end of for/loop

}

};