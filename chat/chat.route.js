// for testing!!!

const router = require('express').Router();
const chatController = require('./chat.controller');

router.post('/', chatController.find);
router.post('/send', chatController.sendMessage);
router.get('/history/:id', chatController.getHistory);

module.exports = router;