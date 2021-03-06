const Goal = require('../models/goal');
const Task = require('../models/task');
const Habit = require('../models/habit');
const moment = require('moment');

module.exports = {
  index, 
  new: newGoal, 
  create, 
  show, 
  edit, 
  update, 
  delete: deleteGoal
}

function index(req, res) {
  Goal.find({user: req.user}, function(err, goals) {
    res.render('goals', { 
      title: 'Goals', 
      user: req.user, 
      goals,
      moment
    });
  });
}

function newGoal(req, res) {
  res.render('goals/new', { 
    title: 'Goals', 
    user: req.user,
  });
}

function create(req, res) {
  const goal = new Goal(req.body);
  goal.user = req.user;
  goal.save(function(err) {
    if (err) {
      console.log(err) 
      return res.redirect('/goals');
    }
    return res.redirect('/goals');
  })
}

function show(req, res) {
  Goal.findById(req.params.id, function(err, thisGoal) {
    Task.find({goal: thisGoal}, function(err, tasks) {
      Habit.find({goal: thisGoal}, function(err, habits) {
      res.render('goals/show', { 
        thisGoal,
        title: 'Goals', 
        user: req.user,
        tasks,
        moment, 
        habits,
        page: undefined
      })
      })
    });
  })
}

function edit(req, res) {
  Goal.findById(req.params.id, function(err, goal) {
    const startValue = goal.startDate.toISOString().slice(0, 16);
    const dueValue = goal.dueDate.toISOString().slice(0, 16);
      res.render('goals/edit', {
          goal,
          title: 'Goals', 
          user: req.user,
          startValue,
          dueValue
      })
  })
}

function update(req, res) {
  Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    overwrite: false
  }, 
  function(err, goal) {
    res.redirect(`/goals/${goal._id}`);
  });
}

function deleteGoal(req, res) {
  Goal.findByIdAndRemove(req.params.id, function(err, confirmation) {
      res.redirect('/goals');
  })
}
