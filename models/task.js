const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: String, 
  details: String, 
  dueDate: Date,
  done: { type: Boolean, default: false },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Task', taskSchema);