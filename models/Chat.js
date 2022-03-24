const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
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
    required: true
  },
  readAt: Date
});

const ChatSchema = new Schema({
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
  messages: [MessageSchema]
});

module.exports = model('Chat', ChatSchema);