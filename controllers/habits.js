const Habit = require('../models/habit');
const Goal = require('../models/goal');
const momentRandom = require('moment-random');

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

    function isDateInArray(x, array) {
      for (var i = 0; i < array.length; i++) {
        if (x.getTime() === array[i].getTime()) {
          return true;
        }
      }
      return false;
    }


    let randomDates = [];

    for (let i = 0; i < 30; i++) {
      let x = momentRandom("2020-06-01", "2020-05-01").set({'hour': 0, 'minute': 0, 'second': 0, 'millisecond': 0});
      let y = new Date(x);
      randomDates.push(y);
    }

    const uniqueDates = [];
    for (var i = 0; i < randomDates.length; i++) {
      if (!isDateInArray(randomDates[i], uniqueDates)) {
        uniqueDates.push(randomDates[i]);
      }
    }
    
    let sortedArray = uniqueDates.sort((a, b) => a.valueOf() - b.valueOf());

    habit.history = sortedArray;
    

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



