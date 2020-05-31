var router = require('express').Router();
var tasksCtrl = require('../controllers/tasks');

router.get('/', isLoggedIn, tasksCtrl.index);
router.get('/new', isLoggedIn, tasksCtrl.new);
router.post('/', isLoggedIn, tasksCtrl.create);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;