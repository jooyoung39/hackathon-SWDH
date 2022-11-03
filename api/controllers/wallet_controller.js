const { getWalletById } = require('../services/wallet_service');

module.exports = {
  getWalletById: (req, res) => {
    getWalletById(req.query.user_id, (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          code: 500,
          error: 'DB communication failed',
        });
      } else {
        res.status(200).json({
          code: 200,
          data: result,
        });
      }
    });
  },
};
