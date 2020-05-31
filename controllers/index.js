const User = require('../models/user');
const Goal = require('../models/goal');

module.exports = {
    index
};

function index(req, res) {
  console.log(!!req.user);
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    Goal.find({user: req.user}, function(err, goals) {
    res.render('today', {
      title: "Today",
      users,
      name: req.query.name,
      sortKey,
      user: req.user, 
      goals
     });
    });
  });
}