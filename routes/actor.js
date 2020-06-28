var express = require('express');
const { updateActor, getAllActors } = require('../controllers/actors');
var router = express.Router();

// Routes related to actor.

module.exports = router;

router.put('/',updateActor)
router.get('/',getAllActors)