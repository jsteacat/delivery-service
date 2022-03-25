const router = require('express').Router();
const userController = require('./user.controller');

router.post('/signup', userController.register);
router.post('/signin', userController.login);

module.exports = router;