// Controller for our scraper
// ============================
var db = require("../models");
var scrapePet = require("../scripts/scrapePet");

module.exports = {
  scrapePetitions: function(req, res) {
    var keywords = ["climate-change", "military-veterans", "homeless"];

    for(i = 0; i < keywords.length; i++) {
    console.log("hit scrapePetitions");
    // scrape the NYT
    /*return*/ scrapePet(keywords[i]).then(function(petitions) {
        // then insert articles into the db
        console.log("...INSERTING Petitions into db");
        return db.Petition.create(petitions);
      }).then(function(dbPetition) {
        if (dbPetition.length === 0) {
        
        }
        else {
          // Otherwise send back a count of how many new articles we got
          
        }
      }).catch(function(err) {
        // This query won't insert articles with duplicate headlines, but it will error after inserting the others
        
      });
    }; //end of FOR LOOP
  }
};