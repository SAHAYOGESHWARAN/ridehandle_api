const { getFareDetails } = require('../models/Fare');

const checkFare = async (req, res) => {
    const { startLocation, endLocation } = req.query;

    try {
        const fare = await getFareDetails(startLocation, endLocation);
        if (!fare) {
            return res.status(404).json({ message: 'Fare not found for the given locations' });
        }
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { checkFare };
