const Goal = require('../models/goal');

module.exports = {
  index
}

function index(req, res) {
  res.render('goals', { 
    title: 'Goals', 
    user: req.user
  });
}