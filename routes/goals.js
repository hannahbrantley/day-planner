var router = require('express').Router();
var goalsCtrl = require('../controllers/goals');

router.get('/', goalsCtrl.index);

module.exports = router;