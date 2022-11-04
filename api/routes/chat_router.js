const router = require('express').Router();
const { getChatById } = require('../controllers/chat_controller');
const authJWT = require('../middlewares/authJWT');

router.get('/', router);

module.exports = router;
