const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newGoal, 
  create
}

function index(req, res) {
  Goal.find({}, function(err, goals){
    res.render('goals', { 
      title: 'Goals', 
      user: req.user, 
      goals
    });
  });
}

function newGoal(req, res) {
  res.render('goals/new', { 
    title: 'Goals', 
    user: req.user
  });
}

function create(req, res) {
  const goal = new Goal(req.body);
  goal.save(function(err) {
    if (err) {
      console.log(err) 
      return res.redirect('/');
    }
    console.log(goal);
    return res.redirect('/goals');
  })
}