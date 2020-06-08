const Journal = require('../models/journal');
const moment = require('moment');

module.exports = {
  index, 
  create,
  delete: deleteJournal
}

function index(req, res) {
  Journal.find({user: req.user}, function(err, journals) {
    res.render('journals', { 
      title: 'Journals', 
      user: req.user, 
      journals,
      moment
    });
  });
}

function create(req, res) {
  if (!!req.body.content) {
  Journal.create(req.body, function(err, journal) {
    res.redirect('/today');
  })}
}

function deleteJournal(req, res) {
  Journal.findByIdAndRemove(req.params.id, function(err, deleteConfirmation) {
    res.redirect('/journals');
  })
}
