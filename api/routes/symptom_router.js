const router = require('express').Router();
const {
  getSymptoms,
  getSymptomById,
} = require('../controllers/symptom_controller');

router.get('/', getSymptoms);
router.get('/:id', getSymptomById);

module.exports = router;
