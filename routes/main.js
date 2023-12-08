const express = require('express');

const mainController = require('../controllers/main');

const router = express.Router();

router.get('/',mainController.getIndex);
router.get('/appointments',mainController.getAppointments);

router.post('/',mainController.postAppointment)

router.get('/deleteAppointment/:id',mainController.deleteAppointment);
router.get('/editAppointment/:id',mainController.editAppointment);

module.exports = router;