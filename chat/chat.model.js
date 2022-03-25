const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref : 'User',
    required: true
  },
  sentAt: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true
  },
  readAt: Date
});

const chatSchema = new Schema({
  users: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
      },
      {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true
      }
    ],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  messages: [messageSchema]
});

module.exports = model('Chat', chatSchema);