const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  name: String,
  details: String,
  startDate: Date,
  dueDate: Date, 
  active: Boolean,
  // tasks: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Task'
  // }]
});

module.exports = mongoose.model('Goal', goalSchema);