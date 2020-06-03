const Habit = require('../models/habit');
const Goal = require('../models/goal');

module.exports = {
  index, 
  new: newHabit,
  create, 
  delete: deleteHabit, 
  show, 
  updateDone
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

function updateDone(req, res) {
  Habit.findById(req.params.id, function(err, habit) {
    console.log('updateDone - first habit:', habit);
    let today = new Date();
    today.setHours(0,0,0,0);
    if (req.body.done === 'on') {
      habit.history.push(today);
    } else {
      console.log('not done baby');
      let idx = habit.history.indexOf(today.toString());
      console.log('idx: ', idx);
      if (idx > -1) {
      habit.history.splice(idx, 1);
      }
    }
    console.log(habit.history);
    habit.save(function(err) {
      console.log('this is the new saved habit with removed history:', habit);
      return res.redirect('back'); 
      })
  })
}

function create(req, res) {
  Goal.findById(req.body.goalId, function (err, selectedGoal) {
    console.log('create habit req.body: ', req.body);
    const habit = new Habit(req.body);
    habit.user = req.user;
    habit.goal.push(selectedGoal);

    for (let i = 0; i < 20; i++) {
      let x = new Date(+(new Date()) - Math.floor(Math.random()*10000000000));
      habit.history.push(x);
    }

    habit.save(function(err) {
      if (err) {
        console.log(err) 
        return res.redirect('/habits/new');
      }
        console.log('this is the habit:', habit);
        return res.redirect('/habits'); 
     });
    });
  };

function deleteHabit(req, res) {
  Habit.findByIdAndDelete(req.params.id, function(err, confirmation) {
    res.redirect('/habits');
  })
}

function show(req, res) {
  Habit.findById(req.params.id, function (err, habit) {
    res.render('habits/show', {
      habit, 
      title: 'Habits', 
      user: req.user
    })
  })
}



