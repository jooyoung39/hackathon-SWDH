const router = require('express').Router();
const { checkStatus } = require('../controllers/root_controller');

router.get('/', checkStatus);

module.exports = router;
