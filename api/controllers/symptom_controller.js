const { getSymptoms, getSymptomById } = require('../services/symptom_service');

module.exports = {
  getSymptoms: (req, res) => {
    getSymptoms((error, result) => {
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
  getSymptomById: (req, res) => {
    getSymptomById(req.params.id, (error, result) => {
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
