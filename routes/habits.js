var router = require('express').Router();
var habitsCtrl = require('../controllers/habits');

router.get('/', isLoggedIn, habitsCtrl.index);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;