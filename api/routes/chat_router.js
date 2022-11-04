const router = require('express').Router();
const { getChatById } = require('../controllers/chat_controller');

router.get('/', getChatById);

module.exports = router;
