const { checkStatus } = require('../services/root_service');

module.exports = {
  checkStatus: (req, res) => {
    checkStatus((error, result) => {
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
