const Task = require('../models/task');
const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newTask, 
  create,
  edit,
  update
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
Goal.findById(req.body.goalId, function (err, goal) {
  const task = new Task(req.body);
  task.user = req.user;
  task.goal = goal;
  task.save(function(err) {
    if (err) {
      console.log(err) 
      return res.redirect('/tasks/new');
    }
      return res.redirect('/tasks'); 
   });
  });
};

function edit(req, res) {
  Task.findById(req.params.id, function(err, task) {
    const dueValue = task.dueDate.toISOString().slice(0, 16);
    Goal.find({}, function(err, goals) {
      res.render('tasks/edit', {
          task,
          title: 'Tasks', 
          dueValue, 
          goals
      })
     })
  })
}

function update(req, res) {
  Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    overwrite: false
  }, 
  function(err, task) {
    console.log(task);
    res.redirect('/tasks');
  });
}