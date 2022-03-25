const { Schema, model } = require('mongoose');

const adSchema = new Schema({
  shortText: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  images: [String],
  userId: {
    type: Schema.Types.ObjectId,
    ref : 'User',
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

module.exports = model('Advertisement', adSchema);