var db = require("../models");
var data = require("../data.json");

// console.log(data);

var getCharity = function() {
    // console.log("hit getCharity function");

    /*var charities = data.map(charity => {

    })*/
    return db.Charity.create(data);
}

module.exports = getCharity;
