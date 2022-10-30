const router = require('express').Router();
const {
  getMedicine,
  getMedicineById,
} = require('../controllers/medicine_controller');

router.get('/', getMedicine);
router.get('/:id', getMedicineById);

module.exports = router;
