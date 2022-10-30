const router = require('express').Router();
const {
  createUser,
  refreshToken,
  tokenTest,
  login,
} = require('../controllers/user_controller');
const authJWT = require('../middlewares/authJWT');

router.post('/', createUser);
router.get('/refresh', refreshToken);
router.get('/test', authJWT, tokenTest);
router.post('/login', login);

module.exports = router;
