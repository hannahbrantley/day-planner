const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String, 
  details: String, 
  dueDate: { type: Date, required: true, default: new Date()},
  done: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  goal: {}
});

module.exports = mongoose.model('Task', taskSchema);