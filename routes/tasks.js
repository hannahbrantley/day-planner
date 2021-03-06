var router = require('express').Router();
var tasksCtrl = require('../controllers/tasks');

router.get('/', isLoggedIn, tasksCtrl.index);
router.get('/new', isLoggedIn, tasksCtrl.new);
router.post('/', isLoggedIn, tasksCtrl.create);
router.put('/isdone/:id', isLoggedIn, tasksCtrl.updateDone);
router.get('/:id/edit', isLoggedIn, tasksCtrl.edit);
router.put('/:id', isLoggedIn, tasksCtrl.update);
router.delete('/:id', isLoggedIn, tasksCtrl.delete);

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/auth/google');
}

module.exports = router;