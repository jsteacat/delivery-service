const Chat = require('./chat.model');

const getChat = async (users) => {
  const chat = await Chat.find(users);
  return chat || null;
};

module.exports = {
  getChat
};