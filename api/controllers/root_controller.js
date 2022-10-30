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
        const year = result.getFullYear();
        const month = result.getMonth() + 1;
        const date = result.getDate();
        const hour = result.getHours();
        const min = result.getMinutes();
        const sec = result.getSeconds();
        res.status(200).json({
          code: 200,
          protocol: req.protocol,
          'user-agent': req.headers['user-agent'],
          data: {
            now: `${year}-${month >= 10 ? month : '0' + month}-${
              date >= 10 ? date : '0' + date
            } ${hour}:${min}:${sec}`,
          },
        });
      }
    });
  },
};
