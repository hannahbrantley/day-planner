const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
  name: String, 
  frequency: [],
  target: Number,
  history: [],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  goal: []
});

module.exports = mongoose.model('Habit', habitSchema);