const Task = require('../models/task');
const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newTask, 
  create,
  edit,
  update, 
  delete: deleteTask
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
      console.log(task);
      console.log('goal name: ', task.goal.name);
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
  Goal.findById(req.body.goalId, function (err, goal) {
    req.body.goal = goal;
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, task) {
      console.log('task after goal find by id: ', task);
      res.redirect('/tasks');
    })
  });
}

function deleteTask (req, res) {
  Task.findByIdAndRemove(req.params.id, function(err, confirmation) {
    res.redirect('/tasks');
  })
}