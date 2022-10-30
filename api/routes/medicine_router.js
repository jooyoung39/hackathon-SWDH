const router = require('express').Router();
const {
  getMedicine,
  getMedicineById,
  getMedicineTypes,
  getMedicineTypeById,
} = require('../controllers/medicine_controller');

router.get('/types', getMedicineTypes);
router.get('/types/:id', getMedicineTypeById);
router.get('/', getMedicine);
router.get('/:id', getMedicineById);

module.exports = router;
