const router = require('express').Router();
const {
  createReservation,
  getReservstions,
  getReservationById,
  getReservationsByUserId,
} = require('../controllers/reservation_controller');
const authJWT = require('../middlewares/authJWT');

router.get('/', getReservstions);
router.post('/', authJWT, createReservation);
router.get('/my', authJWT, getReservationsByUserId);
router.get('/:id', getReservationById);

module.exports = router;
