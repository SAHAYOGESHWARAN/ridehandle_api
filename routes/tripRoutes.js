const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const {
    requestTrip,
    acceptTrip,
    getHistory,
    updateDriverStatus,
} = require('../controllers/tripController');

const router = express.Router();

// Rider requests a trip
router.post('/request', authenticate, requestTrip);

// Driver accepts a trip
router.patch('/accept/:tripId', authenticate, acceptTrip);

// Fetch trip history
router.get('/history', authenticate, getHistory);

// Update driver online/offline status
router.patch('/driver/status', authenticate, updateDriverStatus);

module.exports = router;
