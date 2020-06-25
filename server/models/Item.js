const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  content: String,
  favorite: { type: Boolean, default: false },
  complete: { type: Boolean, default: false },
  createDate: Date,
  modifyDate: Date,
  status: { type: Boolean, default: true },
  _group: { type: Schema.Types.ObjectId, ref: 'groups' },
  _item: { type: Schema.Types.ObjectId, ref: 'items' },
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('items', itemSchema);
