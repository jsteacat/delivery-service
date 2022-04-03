const router = require('express').Router();
const fileMiddleware = require('../middleware/multer.upload');
const isAuthenticated = require('../middleware/isAuthenticated');
const adController = require('./advertisement.controller');

router.get('/', adController.getAll);
router.get('/search', adController.getByParams);
router.get('/:id', adController.getById);
router.post('/', isAuthenticated, fileMiddleware.fields([{name: 'images', maxCount: 5}]), adController.create);
router.delete('/:id', isAuthenticated, adController.remove);

module.exports = router;