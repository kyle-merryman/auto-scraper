var router = require("express").Router();
var charityController = require("../../controllers/dispChar");
var petitionController = require("../../controllers/dispPet"); 
var eventController = require("../../controllers/dispEve");

router.get("/charity/:id", charityController.filterChar);
router.get("/petition/:id", petitionController.filterPet);
router.get("/event/:id", eventController.filterEve);

module.exports = router;