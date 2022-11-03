const {
  createReservation,
  getReservstions,
  getReservationById,
  getReservationsByUserId,
} = require('../services/reservation_service');

module.exports = {
  createReservation: (req, res) => {
    const query = req.query;

    const reservation = {
      user: query.user_id,
      medicine: query.medicine_id,
      quantity: query.quantity,
    };

    if (!reservation.medicine || isNaN(Number(reservation.medicine))) {
      res.status(400).json({
        code: 400,
        error: 'Parameter medicine_id not provided or not a number',
      });
    }

    if (!reservation.quantity || isNaN(Number(reservation.quantity))) {
      res.status(400).json({
        code: 400,
        error: 'Parameter quantity not provided or not a number',
      });
    }

    createReservation(reservation, (error) => {
      if (error) {
        console.log(error);
        res.status(500).json({
          code: 500,
          error: 'DB communication failed',
        });
      } else {
        res.status(200).json({
          code: 200,
          data: reservation,
        });
      }
    });
  },
  getReservstions: (req, res) => {
    getReservstions((error, result) => {
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
  getReservationById: (req, res) => {
    if (!req.params.id || isNaN(Number(req.params.id))) {
      res.status(400).json({
        code: 400,
        error: 'URL Param ID not provided or not a number',
      });
    }

    getReservationById(req.params.id, (error, result) => {
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
  getReservationsByUserId: (req, res) => {
    const query = req.query;

    getReservationsByUserId(query.user_id, (error, result) => {
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
