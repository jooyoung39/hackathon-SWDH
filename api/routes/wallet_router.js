const router = require('express').Router();
const { getWalletById } = require('../controllers/wallet_controller');
const authJWT = require('../middlewares/authJWT');

router.get('/', authJWT, getWalletById);

module.exports = router;
