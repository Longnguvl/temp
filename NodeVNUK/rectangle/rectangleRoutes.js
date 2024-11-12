const express = require('express');										
const router = express.Router();										
const rectangleController = require('../controllers/rectangleController');										
										
// Route cho việc tính chu vi										
router.get('/', rectangleController.calculatePerimeter);										
router.post('/calculate', rectangleController.calculatePerimeter);

module.exports = router;										