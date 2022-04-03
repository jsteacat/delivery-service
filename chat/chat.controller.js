const chatService = require('./chat.service');

const subscriptions = [];

const find = async (req, res) => {
  try {
    const chat = await chatService.getChat(req.body.users);
    res.status(200).json({
      status: 'ok',
      data: chat
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const sendMessage = async (req, res) => {
  const { author, receiver, text } = req.body;
  // Check empty fields
  if (!author || !receiver || !text ) {
    return res.status(422).json({
        status: 'error',
        error: 'Required fields must be filled'
    })
  }

  try {
    const newData = await chatService.sendMessage(req.body);
    const newMessage = newData.messages[newData.messages.length - 1];
    subscriptions.forEach((cb) => cb(newData._id, newMessage));
    res.status(201).json({
      status: 'ok',
      data: newMessage
    });
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await chatService.getHistory(req.params.id);
    res.status(200).json({
      status: 'ok',
      data: history.messages
    });
  } catch(error) {
    res.status(500).json({
      status: 'error',
      error
    })
  }
};

const subscribe = (cb) => {
  subscriptions.push(cb);
};

module.exports = {
  find,
  sendMessage,
  getHistory,
  subscribe
};