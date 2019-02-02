// scrape script
// =============

// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");
//var CronJob = require('cron').CronJob;


// This function will scrape the Change.org website
var scrape = function() {
  //new CronJob('*/30 * * * * *', function(){
  // Scrape the NYTimes website
  //return 
  return axios.get("https://www.change.org/search?q=climate%20change").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log($);
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "css-180b3ld" class
    // (i.e, the section holding the articles)
    $("div.search-result").each(function(i, element) {
      // In each article section, we grab the child with the class story-heading

      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
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
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.change.org" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
//}); //CronJob
};




/////////////////////////////////////////////////////

// This function will scrape the Care2.com website
/*var scrape = function() {
  // Scrape the Care2.com website
  return axios.get("https://www.care2.com/find/site?q=climate%20change&r=petitions&start=1").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "css-180b3ld" class
    // (i.e, the section holding the articles)
    $("div.result").each(function(i, element) {
      console.log(`headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`);
      // In each article section, we grab the child with the class story-heading
      var test = $(this)

      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
        .find(".title")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .find("a")
        .attr("href");

      // Then we grab any children with the class of summary and then grab it's inner text
      // We store this to the sum variable. This is the article summary
      var sum = $(this)
        .find(".snippet")
        .first()
        .text()
        .trim();

      console.log(`headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`);

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);

        console.log(`headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`);

      } else {console.log(`scrape error: element not found \n headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`)}
    });
    return articles;
  });
};*/
/////////////////////////////////////////////////////

//This function will scrape the EventBrite website
/*var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("https://www.eventbrite.com/d/ca--davis/climate-change-protest").then(function(res) {
    var $ = cheerio.load(res.data);
    console.log("scraping");
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "css-180b3ld" class
    // (i.e, the section holding the articles)
    $("li").each(function(i, element) {
      // In each article section, we grab the child with the class story-heading
      var test = $(this);
      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
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

      console.log(`headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`);

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      } else {console.log(`scrape error: element not found \n headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`)}
    });
    return articles;
  });
};*/

/////////////////////////////////////////////////////

//This function will scrape the MeetUp website
/*var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("https://www.meetup.com/find/events/?allMeetups=false&keywords=climate+change&radius=100&userFreeform=Davis%2C+CA&mcId=c95616&mcName=Davis%2C+CA").then(function(res) {
    var $ = cheerio.load(res.data);
    //console.log($);
    console.log("scraping");
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "css-180b3ld" class
    // (i.e, the section holding the articles)
    $("div.event-listing").each(function(i, element) {
      // In each article section, we grab the child with the class story-heading
      var test = $(this);
      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
        .find(".event")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .find("a")
        .first()
        .attr("href");
        

      // Then we grab any children with the class of summary and then grab it's inner text
      // We store this to the sum variable. This is the article summary
      var sum = $(this)
        .find("time")
        .first()
        .text()
        .trim();

      console.log(`headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`);

      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      } else {console.log(`scrape error: element not found \n headline: ${head} \n summary: ${sum} \n url: ${url} \n this: ${test}`)}
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it*/
module.exports = scrape;
//module.exports = scrape2;