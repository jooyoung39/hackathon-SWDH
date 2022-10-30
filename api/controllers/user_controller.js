const { createUser, getUserById } = require('../services/user_service');
const {
  sign,
  verify,
  refresh,
  setRefreshToken,
  dropRefreshToken,
  verifyRefresh,
} = require('../utils/jwt-util');
const jwt = require('jsonwebtoken');
const pbkdf2Password = require('pbkdf2-password');
const hasher = pbkdf2Password({
  saltLength: 128,
  iterations: 10000,
  keyLength: 256,
});

module.exports = {
  createUser: (req, res) => {
    const query = req.query;

    hasher({ password: query.password }, (err, pass, salt, hash) => {
      const user = {
        id: query.id,
        name: query.name,
        hash,
        salt,
      };

      createUser(user, (error) => {
        if (error) {
          if (error.errno === 1062) {
            return res.status(409).json({
              code: 409,
              error: 'User already exist',
            });
          } else {
            return res.status(500).json({
              code: 500,
              error: 'DB communication failed',
            });
          }
        } else {
          return res.status(201).json({
            code: 201,
            message: 'New user added',
            data: user,
          });
        }
      });
    });
  },
  refreshToken: (req, res) => {
    const accessToken = req.headers.token;
    const refreshToken = req.headers.refresh;

    if (!accessToken || !refreshToken) {
      return res.status(400).json({
        code: 400,
        error: 'Access token or refresh token is missing',
      });
    }

    const authResult = verify(accessToken);
    const decoded = jwt.decode(accessToken);

    if (!decoded.id) {
      return res.status(401).json({
        code: 401,
        message: 'No authorized',
      });
    }

    verifyRefresh(decoded.id, refreshToken, (refreshResult) => {
      console.log(refreshResult);

      if (authResult.ok === false && authResult.message === 'jwt expired') {
        if (!refreshResult) {
          return res.status(401).json({
            code: 401,
            message: 'No authorized',
          });
        } else {
          const newAccessToken = sign({ id: decoded.id });
          const newRefreshToken = refresh();

          setRefreshToken(decoded.id, newRefreshToken, (error) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                code: 500,
                error: 'DB communication failed',
              });
            } else {
              return res.status(200).json({
                code: 200,
                data: {
                  newAccessToken,
                  newRefreshToken,
                },
              });
            }
          });
        }
      } else {
        dropRefreshToken(authResult.id, (error) => {
          if (error) {
            console.log(error);
            return res.status(500).json({
              code: 500,
              error: 'DB communication failed',
            });
          } else {
            return res.status(400).json({
              code: 400,
              error: 'Access token is not expired!',
            });
          }
        });
      }
    });
  },
  tokenTest: (req, res) => {
    const query = req.query;
    if (!query.id) console.log('token id', query.id);
    return res.status(200).json({ message: 'ok', id: query.id });
  },
  login: (req, res) => {
    const query = req.query;

    getUserById(query.id, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          code: 500,
          error: 'DB communication failed',
        });
      }

      if (!result.length) {
        return res.status(404).json({
          code: 404,
          error: 'User not found by ID or Password',
        });
      } else {
        const userData = result[0];

        hasher(
          { password: query.password, salt: userData.salt },
          (err, pass, salt, hash) => {
            if (hash === userData.hash) {
              const accessToken = sign(userData);
              const refreshToken = refresh();

              setRefreshToken(query.id, refreshToken, (error) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json({
                    code: 500,
                    error: 'DB communication failed',
                  });
                } else {
                  return res.status(200).json({
                    code: 200,
                    data: {
                      accessToken,
                      refreshToken,
                    },
                  });
                }
              });
            } else {
              return res.status(404).json({
                code: 404,
                error: 'User not found by ID or Password',
              });
            }
          }
        );
      }
    });
  },
};
