const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newGoal, 
  create, 
  show
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
    return res.redirect('/goals');
  })
}

function show(req, res) {
  console.log('hello');
  Goal.findById(req.params.id, function(err, goal) {
    res.render('goals/show', { 
      goal,
      title: 'Goals', 
      user: req.user
    });
  })
}