const Habit = require('../models/habit');

module.exports = {
  index
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