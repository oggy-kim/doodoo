const mongoose = require('mongoose');
const { Schema } = mongoose;
var keys = require('../config/keys');

const messageSchema = new Schema({
  createTime: { type: Date, default: Date.now(), expires: 60 * 60 * 24 * 7 },
  requestMessage: { type: String, default: '' },
  status: { type: Boolean, default: true },
  _group: { type: Schema.Types.ObjectId, ref: 'groups' },
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  _shareUser: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('messages', messageSchema);
