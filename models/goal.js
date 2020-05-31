const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goalSchema = new Schema({
  name: String,
  details: String,
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true }, 
  // active: { type: Boolean, default: true },  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

goalSchema.virtual('active').get(function() {
  var today = new Date();
  if (this.startDate <= today && this.dueDate >= today) return true;
})

module.exports = mongoose.model('Goal', goalSchema);