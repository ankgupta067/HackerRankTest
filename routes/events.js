var express = require('express');
const { addEvent, eraseEvents, getAllEvents, getByActor } = require('../controllers/events');
var router = express.Router();

// Routes related to event


module.exports = router;

router.post('/',addEvent)
router.get("/",getAllEvents)
router.get("/actors/:id([0-9]+)",getByActor)