const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
  author: {
    type: ObjectId,
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
    type: [ObjectId, ObjectId],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  messages: [MessageSchema]
});

module.exports = model('ChatModel', ChatSchema);