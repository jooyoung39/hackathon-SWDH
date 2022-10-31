const router = require('express').Router();
const {
  getUser,
  createUser,
  refreshToken,
  tokenTest,
  login,
} = require('../controllers/user_controller');
const authJWT = require('../middlewares/authJWT');

router.get('/', authJWT, getUser);
router.post('/', createUser);
router.get('/refresh', refreshToken);
router.get('/test', authJWT, tokenTest);
router.post('/login', login);

module.exports = router;
