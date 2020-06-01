const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: String, 
  frequency: {
    sun: Boolean,
    mon: Boolean,
    tue: Boolean,
    wed: Boolean,
    thu: Boolean,
    fri: Boolean,
    sat: Boolean,
  },
  history: [{ 
    date: Date, 
    complete: { type: Boolean, default: false }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  goal: [{
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  }]
});

module.exports = mongoose.model('Habit', habitSchema);