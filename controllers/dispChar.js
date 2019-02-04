var db = require("../models");

module.exports = {
    filterChar: function(req, res) {
        db.Charity
        .find(req.query)
        .filter(charity => {charity.keyword = req.params.id}).then(function(charities) {
            res.json(charities);
            console.log(`Below are the filtered charities: \n`);
            console.log(charities);
        });
    }
}