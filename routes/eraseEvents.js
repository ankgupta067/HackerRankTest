var express = require('express');
var router = express.Router();
const { addEvent, eraseEvents, getAllEvents, getByActor } = require('../controllers/events');

// Route related to delete events

module.exports = router;

router.delete("/",eraseEvents)
