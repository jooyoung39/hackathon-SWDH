const { createChat, getChatById } = require('../services/chat_service');

module.exports = {
  getChatById: (req, res) => {
    const query = req.query;

    getChatById(query.id, (error, result) => {
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
