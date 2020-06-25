const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupSchema = new Schema({
  title: String,
  description: String,
  groupColor: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  _shareUser: { type: Schema.Types.ObjectId, ref: 'users', default: null },
  _message: { type: Schema.Types.ObjectId, ref: 'messages', default: null },
  createDate: Date,
  sharedDate: Date,
});

module.exports = mongoose.model('groups', groupSchema);
