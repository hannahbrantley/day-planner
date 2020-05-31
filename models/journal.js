const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const journalSchema = new Schema({
  date: { 
    type: Date,
    default: function () {
      let today = new Date();
      return today;
    }
  },
  content: { type: String, require: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Journal', journalSchema);