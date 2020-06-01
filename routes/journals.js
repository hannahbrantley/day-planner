var router = require('express').Router();
var journalsCtrl = require('../controllers/journals');

router.get('/', isLoggedIn, journalsCtrl.index);
router.post('/', isLoggedIn, journalsCtrl.create);
router.delete('/:id', isLoggedIn, journalsCtrl.delete);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;