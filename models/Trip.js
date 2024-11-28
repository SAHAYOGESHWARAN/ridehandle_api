const pool = require('../config/db');

const createTrip = async (riderId, startLocation, endLocation, fare) => {
    const result = await pool.query(
        'INSERT INTO trips (rider_id, start_location, end_location, fare, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [riderId, startLocation, endLocation, fare, 'requested']
    );
    return result.rows[0];
};

const updateTrip = async (tripId, driverId, status) => {
    const result = await pool.query(
        'UPDATE trips SET driver_id = $1, status = $2 WHERE id = $3 RETURNING *',
        [driverId, status, tripId]
    );
    return result.rows[0];
};

const getTripsByUser = async (userId, role) => {
    const condition = role === 'rider' ? 'rider_id' : 'driver_id';
    const result = await pool.query(`SELECT * FROM trips WHERE ${condition} = $1`, [userId]);
    return result.rows;
};

module.exports = { createTrip, updateTrip, getTripsByUser };
