require("../config/config")
const jwt = require('jsonwebtoken');
const { status } = require('../helpers/statusCode.helpers');


module.exports = function (req, res, next) {
    // Read the header token
    const token = req.header('x-auth-token');

    // Check if there is no token
    if (!token) {
        return res.status(status.unauthorized).json({ msg: 'No hay Token, permiso no válido' })
    }

    // validate the token
    try {
        const encryption = jwt.verify(token, process.env.SIGNATURE_TOKEN);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(status.unauthorized).json({ msg: 'Token no válido' });
    }
}