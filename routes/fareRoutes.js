const express = require('express');
const { checkFare } = require('../controllers/fareController');

const router = express.Router();

// Check fare details
router.get('/check', checkFare);

module.exports = router;
