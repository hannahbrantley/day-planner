const Task = require('../models/task');
const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newTask, 
  create,
  edit,
  update, 
  delete: deleteTask, 
  updateDone
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
    const dueValue = task.dueDate.toISOString().slice(0, 10);
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
        console.log(task);
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