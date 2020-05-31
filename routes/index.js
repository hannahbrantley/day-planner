var express = require('express');
const passport = require('passport');
var router = express.Router();
var indexCtrl = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
  ));
  
router.get('/oauth2callback', passport.authenticate(
  'google',
{
  successRedirect : '/today',
  failureRedirect : '/today'
}
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
    
router.get('/today', indexCtrl.index);
module.exports = router;
