const {
  getMedicines,
  getMedicineById,
} = require('../services/medicine_service');

module.exports = {
  getMedicine: (req, res) => {
    getMedicines((error, result) => {
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
  getMedicineById: (req, res) => {
    getMedicineById(req.params.id, (error, result) => {
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
