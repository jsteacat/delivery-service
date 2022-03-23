const { Schema, model } = require('mongoose');

const adSchema = new Schema({
  shortText: {
    type: String,
    required: true
  },
  description: String,
  images: [String],
  userId: {
    type: Schema.Types.ObjectId,
    ref : 'UserModel',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  tags: [String],
  isDeleted: {
    type: Boolean,
    required: true
  }
});

module.exports = model('AdModel', adSchema);