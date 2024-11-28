const pool = require('../config/db');

const getFareDetails = async (startLocation, endLocation) => {
    const result = await pool.query(
        'SELECT fare FROM fares WHERE start_location = $1 AND end_location = $2',
        [startLocation, endLocation]
    );
    return result.rows[0];
};

module.exports = { getFareDetails };
