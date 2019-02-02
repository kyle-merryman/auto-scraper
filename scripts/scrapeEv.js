// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");
//var CronJob = require('cron').CronJob;


// This function will scrape the Change.org website
var scrapeEv = function() {
    console.log("////////////// \n hit scrapeEv \n ///////////////");
    return axios.get("https://www.eventbrite.com/d/ca--davis/climate-change-protest").then(function(res) {
        var $ = cheerio.load(res.data);
        console.log("scraping");
        // Make an empty array to save our article info
        var events = [];
    
        // Now, find and loop through each element that has the "css-180b3ld" class
        // (i.e, the section holding the articles)
        $("li").each(function(i, element) {
          // In each article section, we grab the child with the class story-heading
          var test = $(this);
          // Then we grab the inner text of the this element and store it
          // to the head variable. This is the article headline
          var title = $(this)
            .find(".card-text--truncated__three")
            .text()
            .trim();
    
          // Grab the URL of the article
          var url = $(this)
            .find("a")
            .attr("href");
    
          // Then we grab any children with the class of summary and then grab it's inner text
          // We store this to the sum variable. This is the article summary
          var sum = $(this)
            .find(".eds-text-bs--fixed")
            .first()
            .text()
            .trim();
    
          //console.log(`title: ${title} \n summary: ${sum} \n url: ${url} \n this: ${test}`);
    
          // So long as our headline and sum and url aren't empty or undefined, do the following
          if (title && sum && url) {
            // This section uses regular expressions and the trim function to tidy our headlines and summaries
            // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
            var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
    
            // Initialize an object we will push to the articles array
    
            var dataToAdd = {
              title: titleNeat,
              summary: sumNeat,
              url: url
            };
    
            console.log(`This is the event data`);
            console.log(dataToAdd);

            events.push(dataToAdd);
            console.log("This is the events table");
            console.log(events);

          } else {console.log(`scrape error: element not found \n headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`)}
        });
        return events;
      });
};

// Export the function, so other files in our backend can use it*/
module.exports = scrapeEv;
//module.exports = scrape2;