// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");
//var CronJob = require('cron').CronJob;


// This function will scrape the Change.org website
var scrapePet = function() {
  // console.log("hit scrapePet");
  //new CronJob('*/30 * * * * *', function(){
  // Scrape the NYTimes website
  //return 
  return axios.get("https://www.change.org/search?q=climate-change").then(function(res) {
    var $ = cheerio.load(res.data);
    //console.log($);
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "css-180b3ld" class
    // (i.e, the section holding the articles)
    $("div.search-result").each(function(i, element) {
      //while (articles.length < 10) {
      // In each article section, we grab the child with the class story-heading

      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var title = $(this)
        .find("h3")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .find("a")
        .attr("href");

      // Then we grab any children with the class of summary and then grab it's inner text
      // We store this to the sum variable. This is the article summary
      var sum = $(this)
        .find(".type-s")
        .first()
        .text()
        .trim();

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (title && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          keyword: "climate_change",
          title: titleNeat,
          summary: sumNeat,
          url: "https://www.change.org" + url
        };

        // console.log(`This is the petition data`);
        // console.log(dataToAdd);

        articles.push(dataToAdd);
        // console.log("This is the petition table");
        // console.log(articles);
      }
    //} //end of while loop 
    });
    // console.log(articles);
    return articles;
  });
//}); //CronJob
};

// Export the function, so other files in our backend can use it*/
module.exports = scrapePet;
//module.exports = scrape2;