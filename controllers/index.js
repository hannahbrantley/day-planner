const User = require('../models/user');
const Goal = require('../models/goal');
const Task = require('../models/task');
const Habit = require('../models/habit');
const moment = require('moment');
const {google} = require('googleapis');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = {
    index
};

function index(req, res) {
  const user = req.user;
  let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  let sortKey = req.query.sort || 'name';
  User.find(modelQuery)
  .sort(sortKey).exec(function(err, users) {
    if (err) return next(err);
    // Passing search values, name & sortKey, for use in the EJS
    Goal.find({user: req.user}, function(err, goals) {
    Task.find({user: req.user}, function (err, tasks) {
    Habit.find({user: req.user}, function (err, habits) {
        const day = moment();
        res.render('today', {
          title: "Today",
          users,
          name: req.query.name,
          sortKey,
          user: req.user, 
          goals, 
          tasks,
          habits,
          day
        })
      })
     });
   });
 });
}
