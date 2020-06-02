var router = require('express').Router();
var habitsCtrl = require('../controllers/habits');

router.get('/', isLoggedIn, habitsCtrl.index);
router.get('/new', isLoggedIn, habitsCtrl.new);
router.post('/', isLoggedIn, habitsCtrl.create);
router.put('/isdone/:id', isLoggedIn, habitsCtrl.updateDone);
router.delete('/:id', isLoggedIn, habitsCtrl.delete);
router.get('/:id', isLoggedIn, habitsCtrl.show);
//router.get('/:id', isLoggedIn, habitsCtrl.show);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;