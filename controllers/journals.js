const Journal = require('../models/journal');

module.exports = {
  index, 
  create
}

function index(req, res) {
  Journal.find({}, function(err, journals) {
    res.render('journals', { 
      title: 'Journals', 
      user: req.user, 
      journals
    });
  });
}

function create(req, res) {
  Journal.create(req.body, function(err, journal) {
    res.redirect('/today');
  })
}
