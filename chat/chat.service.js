const Chat = require('./chat.model');

const getChat = async (users) => {
  const chat = await Chat.findOne({ users: { $all: users } }).populate('messages');
  return chat || null;
};

const getHistory = async (id) => {
  return await Chat.findById(id).select('-_id messages').populate('messages.author');
};

const sendMessage = async (data) => {
  const { author, receiver, text } = data;
  const currentDate = new Date().toISOString();

  try {
    const chat = await Chat.findOne({ users: { $all: [author, receiver] } });
    if (chat) {
      return await Chat.findOneAndUpdate(
        { _id: chat._id },
        {
          $push: {
            messages: { author, text, sentAt: currentDate },
          },
        },
        { returnDocument: 'after' }
      );
    } else {
      return await Chat.create({
        users: [author, receiver],
        text,
        createdAt: currentDate,
        messages: [{ author, text, sentAt: currentDate }],
      });
    }
  } catch(error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getChat,
  sendMessage,
  getHistory
};