const { verify } = require('../utils/jwt-util');

const authJWT = (req, res, next) => {
  if (req.headers.token) {
    const token = req.headers.token;
    const result = verify(token);
    if (result.ok) {
      req.query.user_id = result.user_id;
      next();
    } else {
      res.status(401).json({
        code: 401,
        message: result.message,
      });
    }
  } else {
    res.status(401).json({
      code: 401,
      message: 'No token provided',
    });
  }
};

module.exports = authJWT;
