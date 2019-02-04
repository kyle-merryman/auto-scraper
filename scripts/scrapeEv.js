var axios = require("axios");
var cheerio = require("cheerio");

var scrapeEv = function() {
var events = [];
var counter = 0;

var getEvent = function(keyword) {
    axios.get("https://www.eventbrite.com/d/ca--davis/" + keyword).then(function(res){
        
        var $ = cheerio.load(res.data);

        var all = [];

        $("li").each(function(i, element) {
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
            // So long as our headline and sum and url aren't empty or undefined, do the following
            if (title && sum && url) {
              // This section uses regular expressions and the trim function to tidy our headlines and summaries
              // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
              var titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
              var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
              // Initialize an object we will push to the articles array
              var dataToAdd = {
                keyword: keyword,
                title: titleNeat,
                summary: sumNeat,
                url: url
                }; //dataToAdd

               all.push(dataToAdd); 
                
            }; //if statement
        }); //$('li').each

        if (!all.length) {
            console.log("ERROR: nothing appended to 'all'");
        } else {
            console.log(all);
        }

        return all;
    }); //axios.get
}; //end of function

/*-------------------------------------------------------------*/
var eventCounter = function() {
    var keywords = ["climate-change", "military-veterans", "homeless"];
    const indexLim = keywords.length;
    // console.log(indexLim);

    if (counter < indexLim) {
        // console.log(counter);
        // console.log(indexLim);
        // console.log(keywords[counter]);
        //events.push(keywords[counter]);
        getEvent(keywords[counter]);
        counter++ 
        eventCounter();
    } else {
        return events;
    }
}

//eventCounter();
console.log(events);
//return events
/*-------------------------------------------------------------*/
} //end of scrapeEv()
/*-------------------------------------------------------------*/
//scrapeEv();

//export
module.exports = scrapeEv;