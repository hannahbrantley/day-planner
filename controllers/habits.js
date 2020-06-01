const Habit = require('../models/habit');
const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newHabit,
  create
}

function index(req, res) {
  Habit.find({}, function(err, habits) {
    res.render('habits', { 
      title: 'Habits', 
      user: req.user, 
      habits
    });
  });
}

function newHabit(req, res) {
  Goal.find({}, function (err, goals) {
    res.render('habits/new', {
      goals,
      title: 'Habits', 
      user: req.user,
    });
  })
}

function create(req, res) {
  Goal.findById(req.body.goalId, function (err, goal) {
    req.body.goal = goal;
    console.log(req.body);
    Habit.create(req.body, function(err, newHabit) {
      newHabit.goal.push(goal);
    })
  })
}

