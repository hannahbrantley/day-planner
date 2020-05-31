const Task = require('../models/task');
const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newTask, 
  create
}

function index(req, res) {
  Task.find({}, function(err, tasks) {
    res.render('tasks', { 
      title: 'Tasks', 
      user: req.user, 
      tasks
    });
  });
}

function newTask(req, res) {
  Goal.find({}, function (err, goals) {
    res.render('tasks/new', {
      goals,
      title: 'Tasks', 
      user: req.user,
    });
  })
}

function create(req, res) {
  console.log(req.body);
  const task = new Task(req.body);
  task.user = req.user;
  task.save(function(err) {
    if (err) {
      console.log(err) 
      return res.redirect('/tasks/new');
    }
    Goal.findById(req.body.goalId, function(err, goal) {
      goal.tasks.push(task);
      console.log(goal.tasks);
    })
    return res.redirect('/tasks');
  })
};