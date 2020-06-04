var router = require('express').Router();
var goalsCtrl = require('../controllers/goals');

router.get('/', isLoggedIn, goalsCtrl.index);
router.get('/new', isLoggedIn, goalsCtrl.new);
router.post('/', isLoggedIn, goalsCtrl.create);
router.get('/:id/edit', isLoggedIn, goalsCtrl.edit);
router.get('/:id', isLoggedIn, goalsCtrl.show);
router.put('/:id', isLoggedIn, goalsCtrl.update);
router.delete('/:id', isLoggedIn, goalsCtrl.delete);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;