const { createTrip, updateTrip, getTripsByUser } = require('../models/Trip');

const requestTrip = async (req, res) => {
    const { startLocation, endLocation, fare } = req.body;
    const { id: riderId } = req.user;

    try {
        const trip = await createTrip(riderId, startLocation, endLocation, fare);
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const acceptTrip = async (req, res) => {
    const { tripId } = req.params;
    const { id: driverId } = req.user;

    try {
        const trip = await updateTrip(tripId, driverId, 'accepted');
        if (!trip) {
            return res.status(404).json({ message: 'Trip not found or already accepted' });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHistory = async (req, res) => {
    const { id: userId, role } = req.user;

    try {
        const trips = await getTripsByUser(userId, role);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDriverStatus = async (req, res) => {
    const { status } = req.body;
    const { id: driverId } = req.user;

    try {
        const result = await pool.query('UPDATE users SET status = $1 WHERE id = $2 RETURNING *', [
            status,
            driverId,
        ]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        res.status(200).json({ message: 'Driver status updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { requestTrip, acceptTrip, getHistory, updateDriverStatus };
