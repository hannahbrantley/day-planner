const Task = require('../models/task');
const Goal = require('../models/goal');
const moment = require('moment');

module.exports = {
  index, 
  new: newTask, 
  create,
  edit,
  update, 
  delete: deleteTask, 
  updateDone,
  newForGoal
}

function index(req, res) {
  Task.find({user: req.user}, function(err, tasks) {
    res.render('tasks', { 
      title: 'Tasks', 
      user: req.user, 
      tasks,
      moment
    });
  });
}

function newTask(req, res) {
  Goal.find({user: req.user}, function (err, goals) {
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
    const dueValue = task.dueDate.toISOString().slice(0, 10);
    Goal.find({user: req.user}, function(err, goals) {
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
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, task) {
    Goal.findById(req.body.goalId, function (err, goal) {
      task.goal = goal;
      task.save(function(err) {
        if (err) {
          console.log(err) 
          return res.redirect('/tasks');
        }
          return res.redirect('/tasks'); 
       });
    })
  })
}

function updateDone(req, res) {
  Task.findById(req.params.id, function(err, task) {
    task.done = !task.done;
    task.save(function(err) {
      if (err) { 
        console.log(err); 
        res.redirect('/tasks');
      } else { 
        res.redirect('back');
      }
    })
  })
}

function deleteTask (req, res) {
  Task.findByIdAndRemove(req.params.id, function(err, confirmation) {
    res.redirect('/tasks');
  })
}

function newForGoal(req, res) {
  Goal.findById(req.params.id, function (err, goal) {
    res.render('tasks/new', {
      goals,
      title: 'Tasks', 
      user: req.user,
    });
  })
}
